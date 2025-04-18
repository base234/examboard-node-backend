import { BaseSeeder } from '@adonisjs/lucid/seeders'
import SubjectCategories from '#models/subject_category'

export default class extends BaseSeeder {
  async run() {
    await SubjectCategories.createMany([
      { flag: 'applied_sciences_and_technology', display_flag: 'Applied Sciences and Technology', short_name: 'AST' },
      { flag: 'arts_and_humanities', display_flag: 'Arts and Humanities', short_name: 'AH' },
      { flag: 'business_and_management', display_flag: 'Business and Management', short_name: 'BM' },
      { flag: 'health_and_medicine', display_flag: 'Health and Medicine', short_name: 'HM' },
      { flag: 'languages_and_literature', display_flag: 'Languages and Literature', short_name: 'LL' },
      { flag: 'law_and_governance', display_flag: 'Law and Governance', short_name: 'LG' },
      { flag: 'mathematics_and_logic', display_flag: 'Mathematics and Logic', short_name: 'ML' },
      { flag: 'physical_education_and_sports', display_flag: 'Physical Education and Sports', short_name: 'PES' },
      { flag: 'science', display_flag: 'Science', short_name: 'S' },
      { flag: 'social_sciences', display_flag: 'Social Sciences', short_name: 'SS' },
      { flag: 'vocational_and_technical_skills', display_flag: 'Vocational and Technical Skills', short_name: 'VTS' }
    ])
  }
}
