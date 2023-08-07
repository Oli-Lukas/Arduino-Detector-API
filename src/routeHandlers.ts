import { Request, Response } from 'express';
import twilio from 'twilio';
import { User } from './mongoConfig';
import { IRegisterUserRequestBody } from './types';
import 'dotenv/config';
import { createDateTime } from './util';

export async function handleAlert(request: Request<{ detectorCode: number }>, response: Response): Promise<Response>
{
  const accountSid   = process.env.TWILIO_ACCOUNT_SID;
  const authToken    = process.env.TWILIO_AUTH_TOKEN;
  const phoneNumber  = process.env.TWILIO_PHONE_NUMBER;
  const targetNumber = process.env.TARGET_PHONE_NUMBER;

  const twilioClient = twilio(accountSid, authToken);
  const detectorCode = Number(request.params.detectorCode);

  let alertMessage: string;
  let dateTime: string = createDateTime();

  alertMessage = (detectorCode === 1) ?
    `Alerta!
às ${dateTime} foi detectado fogo nas imediações do sensor!
    ` :
    `Alerta!
às ${dateTime} foi detectado gás inflamável nas imediações do sensor!
    `;

  const message = await twilioClient
    .messages
    .create({
      from: `${phoneNumber}`,
      to: `${targetNumber}`,
      body: alertMessage
    });

  return response.status(200).json(message).end();
}

export async function handleRegisterUser(request: Request<any, any, IRegisterUserRequestBody>, response: Response): Promise<Response>
{
  const requestUser = request.body;
  const newUser = new User({...requestUser});

  newUser.save();

  return response.status(200).send(newUser.name).end();
}

export async function handleGetUsers(request: Request, response: Response): Promise<Response>
{
  const documents = await User.find({}, '-_id name phone_number');

  return response.status(200).json(documents).end();
}
