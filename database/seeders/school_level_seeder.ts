import { BaseSeeder } from '@adonisjs/lucid/seeders'
import SchoolType from '#models/school_level'

export default class extends BaseSeeder {
  async run() {
    await SchoolType.createMany([
      { school_type_id: 1, flag: 'pre-school', display_flag: 'Pre-school', short_name: 'Pre-school' },
      { school_type_id: 1, flag: 'school', display_flag: 'School', short_name: 'School' },
      { school_type_id: 1, flag: 'high-school', display_flag: 'High School', short_name: 'HS' },
      { school_type_id: 2, flag: 'undergraduate', display_flag: 'Undergraduate', short_name: 'UG' },
      { school_type_id: 2, flag: 'postgraduate', display_flag: 'Postgraduate', short_name: 'PG' },
    ])
  }
}
