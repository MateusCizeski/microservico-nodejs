import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['noted-glider-6156-us1-kafka.upstash.io:9092'],
  ssl: true,
  sasl: {
      mechanism: 'scram-sha-256',
      username: 'bm90ZWQtZ2xpZGVyLTYxNTYkqLxXbpZQNLoJEssomPm3Aknn0RiViBQIzyW3q40',
      password: 'NzZhNmZlMTYtYzYxNC00ODY3LTg5YzEtNDNjYzI5MzFkMjFk'
  }
});

export { kafka };