import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Insert default API services
    const services = [
      {
        name: 'framespell',
        display_name: 'FrameSpell API',
        description: 'Fortschrittliche Rechtschreibprüfung mit KI-Power',
        type: 'text_processing',
        version: '1.0.0',
        pricing: JSON.stringify({
          free: { tokens: 10000, price: 0 },
          basic: { tokens: 100000, price: 9.99 },
          pro: { tokens: 1000000, price: 49.99 }
        })
      },
      {
        name: 'corechain',
        display_name: 'CoreChain AI',
        description: 'KI-Orchestrierung für komplexe Workflows',
        type: 'ai_orchestration',
        version: '2.0.0',
        pricing: JSON.stringify({
          free: { calls: 100, price: 0 },
          basic: { calls: 10000, price: 19.99 },
          pro: { calls: 100000, price: 99.99 }
        })
      },
      {
        name: 'corechain_api',
        display_name: 'CoreChain API',
        description: 'Entwickler-API für AI-Orchestrierung',
        type: 'api_service',
        version: '1.0.0',
        pricing: JSON.stringify({
          basic: { calls: 50000, price: 29.99 },
          pro: { calls: 500000, price: 149.99 },
          enterprise: { calls: -1, price: 499.99 }
        })
      },
      {
        name: 'spherehub',
        display_name: 'SphereHub',
        description: 'Lokale AI-Modelle & Smart Home Integration',
        type: 'device',
        version: '2.0.0',
        pricing: JSON.stringify({
          device: { price: 299.99 },
          subscription: { price: 9.99 }
        })
      },
      {
        name: 'spherenet',
        display_name: 'SphereNet',
        description: 'Öffentliches Netzwerk von KI-Modellen',
        type: 'network',
        version: '1.0.0',
        pricing: JSON.stringify({
          free: { calls: 1000, price: 0 },
          basic: { calls: 100000, price: 24.99 },
          pro: { calls: 1000000, price: 199.99 }
        })
      }
    ];

    console.log('📦 Inserting API services...');
    for (const service of services) {
      await pool.query(
        `INSERT INTO api_services (name, display_name, description, type, version, pricing)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (name) DO UPDATE SET
         display_name = EXCLUDED.display_name,
         description = EXCLUDED.description,
         type = EXCLUDED.type,
         version = EXCLUDED.version,
         pricing = EXCLUDED.pricing`,
        [service.name, service.display_name, service.description, service.type, service.version, service.pricing]
      );
      console.log(`   ✓ ${service.display_name}`);
    }

    // Create demo user
    console.log('\n👤 Creating demo user...');
    const hashedPassword = await bcrypt.hash('demo123456', 10);
    
    const userResult = await pool.query(
      `INSERT INTO users (name, email, password_hash, email_verified, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE SET
       name = EXCLUDED.name,
       password_hash = EXCLUDED.password_hash
       RETURNING id`,
      ['Demo User', 'demo@framesphere.dev', hashedPassword, true, 'user']
    );

    const userId = userResult.rows[0].id;
    console.log(`   ✓ Demo user created (email: demo@framesphere.dev, password: demo123456)`);

    // Grant access to all services for demo user
    console.log('\n🔑 Granting service access to demo user...');
    const servicesResult = await pool.query('SELECT id, display_name FROM api_services');
    
    for (const service of servicesResult.rows) {
      await pool.query(
        `INSERT INTO service_access (user_id, service_id, access_level)
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id, service_id) DO NOTHING`,
        [userId, service.id, 'pro']
      );
      console.log(`   ✓ Access granted to ${service.display_name}`);
    }

    // Create demo API key
    console.log('\n🔐 Creating demo API key...');
    const demoApiKey = 'fs_demo_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    await pool.query(
      `INSERT INTO api_keys (user_id, name, key, rate_limit)
       VALUES ($1, $2, $3, $4)`,
      [userId, 'Demo API Key', demoApiKey, 10000]
    );
    console.log(`   ✓ API Key: ${demoApiKey}`);

    // Create demo subscription
    console.log('\n💳 Creating demo subscription...');
    await pool.query(
      `INSERT INTO subscriptions (user_id, plan_name, price, quota_tokens, quota_api_calls, starts_at)
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)`,
      [userId, 'Pro Plan', 99.99, 10000000, 1000000]
    );
    console.log('   ✓ Pro subscription activated');

    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n📝 Demo Login Credentials:');
    console.log('   Email: demo@framesphere.dev');
    console.log('   Password: demo123456');
    console.log(`   API Key: ${demoApiKey}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
