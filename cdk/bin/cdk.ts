#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';
import { Tags } from 'aws-cdk-lib';

const app = new cdk.App();

const regionsToDeploy = ['us-east-1', 'us-east-2'];

regionsToDeploy.forEach((regionCode) => {
  const stack = new CdkStack(app, `WebSocketStack-${regionCode}`, {
    env: { region: regionCode },
    regionCodeToReplicate: regionsToDeploy.filter((replicationRegion) => replicationRegion !== regionCode)
  });
  Tags.of(stack).add('project', 'multi-region-websocket');
});