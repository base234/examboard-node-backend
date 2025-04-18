import { BaseSeeder } from '@adonisjs/lucid/seeders'
import SchoolClass from '#models/school_class'

export default class extends BaseSeeder {
  async run() {
    await SchoolClass.createMany([
      // Pre-school
      { school_type_id: 1, school_level_id: 1, flag: 'lkg', display_flag: 'Lower Kindergarten', short_name: 'LKG' },
      { school_type_id: 1, school_level_id: 1, flag: 'ukg', display_flag: 'Upper Kindergarten', short_name: 'UKG' },

      // School
      { school_type_id: 1, school_level_id: 2, flag: 'class-1', display_flag: 'I', short_name: 'I' },
      { school_type_id: 1, school_level_id: 2, flag: 'class-2', display_flag: 'II', short_name: 'II' },
      { school_type_id: 1, school_level_id: 2, flag: 'class-3', display_flag: 'III', short_name: 'III' },
      { school_type_id: 1, school_level_id: 2, flag: 'class-4', display_flag: 'IV', short_name: 'IV' },
      { school_type_id: 1, school_level_id: 2, flag: 'class-5', display_flag: 'V', short_name: 'V' },
      { school_type_id: 1, school_level_id: 2, flag: 'class-6', display_flag: 'VI', short_name: 'VI' },
      { school_type_id: 1, school_level_id: 2, flag: 'class-7', display_flag: 'VII', short_name: 'VII' },
      { school_type_id: 1, school_level_id: 2, flag: 'class-8', display_flag: 'VIII', short_name: 'VIII' },
      { school_type_id: 1, school_level_id: 2, flag: 'class-9', display_flag: 'IX', short_name: 'IX' },
      { school_type_id: 1, school_level_id: 2, flag: 'class-10', display_flag: 'X', short_name: 'X' },

      // High School
      { school_type_id: 1, school_level_id: 3, flag: 'class-11', display_flag: 'XI', short_name: 'XI' },
      { school_type_id: 1, school_level_id: 3, flag: 'class-12', display_flag: 'XII', short_name: 'XII' },

      // Undergraduate
      { school_type_id: 2, school_level_id: 4, flag: "bamm", display_flag: "Bachelor of Animation and Multimedia", short_name: "BAMM" },
      { school_type_id: 2, school_level_id: 4, flag: "ba", display_flag: "Bachelor of Arts", short_name: "BA" },
      { school_type_id: 2, school_level_id: 4, flag: "bca", display_flag: "Bachelor of Computer Applications", short_name: "BCA" },
      { school_type_id: 2, school_level_id: 4, flag: "bcom", display_flag: "Bachelor of Commerce", short_name: "BCom" },
      { school_type_id: 2, school_level_id: 4, flag: "bdes", display_flag: "Bachelor of Design", short_name: "BDes" },
      { school_type_id: 2, school_level_id: 4, flag: "bed", display_flag: "Bachelor of Education", short_name: "BEd" },
      { school_type_id: 2, school_level_id: 4, flag: "bfa", display_flag: "Bachelor of Fine Arts", short_name: "BFA" },
      { school_type_id: 2, school_level_id: 4, flag: "bhm", display_flag: "Bachelor of Hotel Management", short_name: "BHM" },
      { school_type_id: 2, school_level_id: 4, flag: "bpt", display_flag: "Bachelor of Physiotherapy", short_name: "BPT" },
      { school_type_id: 2, school_level_id: 4, flag: "bsc", display_flag: "Bachelor of Science", short_name: "BSc" },
      { school_type_id: 2, school_level_id: 4, flag: "bscagri", display_flag: "Bachelor of Science in Agriculture", short_name: "BSc Agriculture" },
      { school_type_id: 2, school_level_id: 4, flag: "bscn", display_flag: "Bachelor of Science in Nursing", short_name: "BSc Nursing" },
      { school_type_id: 2, school_level_id: 4, flag: "bba", display_flag: "Bachelor of Business Administration", short_name: "BBA" },
      { school_type_id: 2, school_level_id: 4, flag: "btech", display_flag: "Bachelor of Technology", short_name: "BTech" },
      { school_type_id: 2, school_level_id: 4, flag: "beng", display_flag: "Bachelor of Engineering", short_name: "BEng" },
      { school_type_id: 2, school_level_id: 4, flag: "bjmc", display_flag: "Bachelor of Journalism and Mass Communication", short_name: "BJMC" },
      { school_type_id: 2, school_level_id: 4, flag: "llb", display_flag: "Bachelor of Law", short_name: "LLB" },
      { school_type_id: 2, school_level_id: 4, flag: "bpharm", display_flag: "Bachelor of Pharmacy", short_name: "BPharm" },
      { school_type_id: 2, school_level_id: 4, flag: "bsw", display_flag: "Bachelor of Social Work", short_name: "BSW" },

      // Postgraduate
      { school_type_id: 2, school_level_id: 5, flag: 'ma', display_flag: 'Master of Arts', short_name: 'MA' },
      { school_type_id: 2, school_level_id: 5, flag: 'maca', display_flag: 'Master of Computer Applications', short_name: 'MCA' },
      { school_type_id: 2, school_level_id: 5, flag: 'mcom', display_flag: 'Master of Commerce', short_name: 'MCom' },
      { school_type_id: 2, school_level_id: 5, flag: 'mba', display_flag: 'Master of Business Administration', short_name: 'MBA' },
      { school_type_id: 2, school_level_id: 5, flag: 'mfa', display_flag: 'Master of Fine Arts', short_name: 'MFA' },
      { school_type_id: 2, school_level_id: 5, flag: 'mhm', display_flag: 'Master of Hotel Management', short_name: 'MHM' },
      { school_type_id: 2, school_level_id: 5, flag: 'mpt', display_flag: 'Master of Physiotherapy', short_name: 'MPT' },
      { school_type_id: 2, school_level_id: 5, flag: 'mph', display_flag: 'Master of Public Health', short_name: 'MPH' },
      { school_type_id: 2, school_level_id: 5, flag: 'ms', display_flag: 'Master of Science', short_name: 'MS' },
      { school_type_id: 2, school_level_id: 5, flag: 'msc', display_flag: 'Master of Science in Agriculture', short_name: 'MSc Agriculture' },
      { school_type_id: 2, school_level_id: 5, flag: 'mscn', display_flag: 'Master of Science in Nursing', short_name: 'MSc Nursing' },
      { school_type_id: 2, school_level_id: 5, flag: 'msci', display_flag: 'Master of Science in Information Technology', short_name: 'MSc IT' },
      { school_type_id: 2, school_level_id: 5, flag: 'mscbio', display_flag: 'Master of Science in Biotechnology', short_name: 'MSc Biotechnology' },
      { school_type_id: 2, school_level_id: 5, flag: 'mtech', display_flag: 'Master of Technology', short_name: 'MTech' },
      { school_type_id: 2, school_level_id: 5, flag: 'mphil', display_flag: 'Master of Philosophy', short_name: 'MPhil' },
      { school_type_id: 2, school_level_id: 5, flag: 'llm', display_flag: 'Master of Law', short_name: 'LLM' },
      { school_type_id: 2, school_level_id: 5, flag: 'med', display_flag: 'Master of Education', short_name: 'MEd' },
      { school_type_id: 2, school_level_id: 5, flag: 'msw', display_flag: 'Master of Social Work', short_name: 'MSW' },
    ])
  }
}
