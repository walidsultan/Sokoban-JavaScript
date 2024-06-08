import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CfnApp, CfnBranch } from 'aws-cdk-lib/aws-amplify';

export class SokobanAmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const amplifyApp = new CfnApp(this, 'Sokoban-JS', {
      name: 'Sokoban-JS-Amplify',
      repository: 'https://github.com/walidsultan/Sokoban-JavaScript',
      oauthToken: cdk.SecretValue.secretsManager('github-token').unsafeUnwrap()
    });

    new CfnBranch(this, 'MasterBranch', {
      appId: amplifyApp.attrAppId,
      branchName: 'master' // you can put any branch here (careful, it will listen to changes on this branch)
    });
  }
}