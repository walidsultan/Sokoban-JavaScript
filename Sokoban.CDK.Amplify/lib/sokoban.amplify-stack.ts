import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as amplify from "@aws-cdk/aws-amplify";

export class SokobanAmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const amplifyApp = new amplify.App(this, "Sokoban-JS", {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "[Repository-Owner]",
        repository: "[Repository-Name]",
        oauthToken: cdk.SecretValue.secretsManager("[Secret-Name]", {
          jsonField: "[Secret-Key]",
        }),
      }),
    });
  }
}