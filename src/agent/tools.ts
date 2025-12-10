import { z } from 'zod';

import { endCall } from '@/providers/twilio';
import { logger } from '@/utils/console-logger';

import type { AppDataType } from './agent';
import type { ToolsConfig } from './types';

const loggerContext = 'Tools';

export const TOOLS = {
  end_call: {
    type: 'call',
    name: 'end_call',
    description: 'Finaliza la llamada actual.',
    function: (args: unknown, { session }: AppDataType) => {
      // disconnect call
      if (session.incomingCall?.CallSid) {
        endCall(session.incomingCall.CallSid, session.incomingCall.CallerCountry)
          .then(() => {
            logger.log(`Call ${session.incomingCall?.CallSid} ended`, undefined, loggerContext);
          })
          .catch((err) => logger.error('Error ending call', err, undefined, loggerContext));
      }
    },
  },
  call_summary: {
    type: 'webhook',
    isHidden: true,
    name: 'call_summary',
    description: 'Devuelve un resumen de la llamada',
    response: z.object({
      customerName: z.string().describe('Nombre del cliente'),
      customerLanguage: z.string().describe('El idioma en el que habló el cliente'),
      customerAvailability: z.string().describe('Disponibilidad del cliente'),
      specialNotes: z.string().describe('Notas especiales sobre la conversación'),
    }),
  },
  read_memory: {
    type: 'webhook',
    name: 'read_memory',
    description: 'Devuelve la memoria del agente para el llamante',
    parameters: z.object({
      key: z.string().optional().describe('Opcionalmente especifica una clave para leer de la memoria'),
    }),
    response: z.array(
      z.object({
        key: z.string(),
        value: z.string(),
        isGlobal: z
          .boolean()
          .optional()
          .describe('Si la memoria es global para todos los usuarios/clientes'),
      })
    ),
  },
  add_memory: {
    type: 'webhook',
    name: 'add_memory',
    description: 'Agrega un par clave-valor a la memoria',
    parameters: z.object({
      key: z.string(),
      value: z.string(),
      isGlobal: z
        .boolean()
        .optional()
        .describe(
          'Si la memoria es global para todos los usuarios/clientes. Por defecto: false. Advertencia: ¡Usar con precaución!'
        ),
    }),
  },
  remove_memory: {
    type: 'webhook',
    name: 'remove_memory',
    description: 'Elimina un par clave-valor de la memoria',
    parameters: z.object({
      key: z.string(),
      isGlobal: z
        .boolean()
        .optional()
        .describe(
          'Si la clave a eliminar es global para todos los usuarios/clientes. Por defecto: false. Advertencia: ¡Usar con precaución!'
        ),
    }),
  },
  calendar_check_availability: {
    type: 'webhook',
    name: 'calendar_check_availability',
    description:
      "Verifica la disponibilidad del calendario. Comprueba si hay una cita disponible desde 'startAt' hasta 'endAt'.",
    parameters: z.object({
      startAt: z.string().describe('La fecha y hora de inicio de la verificación de disponibilidad'),
      endAt: z.string().describe('La fecha y hora de fin de la verificación de disponibilidad'),
    }),
    response: z.object({
      available: z.boolean().describe('Si el calendario está disponible'),
    }),
  },
  calendar_schedule_appointment: {
    type: 'webhook',
    name: 'calendar_schedule_appointment',
    description: 'Programa una cita en el calendario',
    parameters: z.object({
      startAt: z.string().describe('La fecha y hora de inicio de la cita'),
      endAt: z.string().describe('La fecha y hora de fin de la cita'),
      title: z
        .string()
        .describe(
          'El título de la cita. Por favor incluye el servicio solicitado y el nombre del cliente.'
        ),
      description: z
        .string()
        .describe(
          'La descripción detallada de la cita. Por favor incluye detalles de la llamada, información de contacto detallada (ej. número de teléfono, nombre), información del servicio solicitado y cualquier otra información relevante.'
        ),
    }),
  },
  calendar_get_user_appointments: {
    type: 'webhook',
    name: 'calendar_get_user_appointments',
    description: 'Devuelve todas las citas del usuario',
    response: z.array(
      z.object({
        id: z.string(),
        status: z.enum(['confirmed', 'tentative', 'cancelled']),
        summary: z.string(),
        description: z.string(),
        start: z.object({ dateTime: z.string(), timeZone: z.string() }),
        end: z.object({ dateTime: z.string(), timeZone: z.string() }),
      })
    ),
  },
  web_scraper: {
    type: 'webhook',
    name: 'web_scraper',
    description: 'Extrae información de un sitio web',
    parameters: z.object({
      url: z.string().describe('La URL del sitio web a extraer'),
      mode: z
        .enum(['text', 'print', 'article', 'source', 'screenshot'])
        .default('text')
        .describe('El modo de extracción. Por defecto: text.'),
    }),
    response: z.object({
      content: z.string().describe('El contenido extraído'),
    }),
  },
} satisfies ToolsConfig<AppDataType>;
