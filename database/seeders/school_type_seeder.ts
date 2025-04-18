import { BaseSeeder } from '@adonisjs/lucid/seeders'
import SchoolType from '#models/school_type'

export default class extends BaseSeeder {
  async run() {
    await SchoolType.createMany([
      { flag: 'school', display_flag: 'School', short_name: 'School' },
      { flag: 'college', display_flag: 'College', short_name: 'College' },
      { flag: 'phd', display_flag: 'Doctor of Philosophy', short_name: 'PhD' },
    ])
  }
}
