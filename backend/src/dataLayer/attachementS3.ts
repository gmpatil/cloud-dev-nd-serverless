import * as AWSb from 'aws-sdk';

import { createLogger } from '../utils/logger' ;

const logger = createLogger("attachementS3");

const AWSXRay = require('aws-xray-sdk');

const AWS = AWSXRay.captureAWS(AWSb)
const s3 = new AWS.S3({ signatureVersion: 'v4' });
const s3bucketName = process.env.IMAGES_S3_BUCKET
const sgndUrlExp = parseInt(process.env.SIGNED_URL_EXPIRATION);

export async function deleteAttachement(todoId: string): Promise<void> {
    logger.debug("todoDb.deleteAttachement - in");  
    try {
        await s3.deleteObject({ Bucket: s3bucketName, Key: todoId}, (err, data) => {
            if (!err) {
                logger.error("Error deleting attachement from S3 bucket-1", err);
            } else {
                logger.debug("Deleted attachement from S3 bucket.", (data ? data[0]: ""));
            }
        }).promise() ;
    } catch (error) {
        logger.error("Error deleting attachement from the S3 bucket-2", error);
    }

    logger.debug("todoDb.deleteAttachement - out");      
}