import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Subjects from '#models/subject'

export default class extends BaseSeeder {
  async run() {
    await Subjects.createMany([
      // Applied Sciences and Technology
      { subject_category_id: 1, flag: 'civil-engineering', display_flag: 'Civil Engineering', short_name: 'CE' },
      { subject_category_id: 1, flag: 'mechanical-engineering', display_flag: 'Mechanical Engineering', short_name: 'ME' },
      { subject_category_id: 1, flag: 'electrical-engineering', display_flag: 'Electrical Engineering', short_name: 'EE' },
      { subject_category_id: 1, flag: 'computer-engineering', display_flag: 'Computer Engineering', short_name: 'CompE' },
      { subject_category_id: 1, flag: 'chemical-engineering', display_flag: 'Chemical Engineering', short_name: 'ChE' },
      { subject_category_id: 1, flag: 'environmental-engineering', display_flag: 'Environmental Engineering', short_name: 'EnvE' },
      { subject_category_id: 1, flag: 'information-technology', display_flag: 'Information Technology', short_name: 'IT' },
      { subject_category_id: 1, flag: 'software-engineering', display_flag: 'Software Engineering', short_name: 'SE' },
      { subject_category_id: 1, flag: 'robotics', display_flag: 'Robotics', short_name: 'R' },
      { subject_category_id: 1, flag: 'data-science', display_flag: 'Data Science', short_name: 'DS' },
      { subject_category_id: 1, flag: 'artificial-intelligence', display_flag: 'Artificial Intelligence', short_name: 'AI' },
      { subject_category_id: 1, flag: 'cybersecurity', display_flag: 'Cybersecurity', short_name: 'CSec' },
      { subject_category_id: 1, flag: 'machine-learning', display_flag: 'Machine Learning', short_name: 'ML' },
      { subject_category_id: 1, flag: 'network-administration', display_flag: 'Network Administration', short_name: 'NA' },
      { subject_category_id: 1, flag: 'web-development', display_flag: 'Web Development', short_name: 'WD' },

      // Arts and Humanities
      { subject_category_id: 2, flag: 'fine-arts', display_flag: 'Fine Arts', short_name: 'FA' },
      { subject_category_id: 2, flag: 'music', display_flag: 'Music', short_name: 'M' },
      { subject_category_id: 2, flag: 'drama', display_flag: 'Drama', short_name: 'D' },
      { subject_category_id: 2, flag: 'dance', display_flag: 'Dance', short_name: 'Da' },
      { subject_category_id: 2, flag: 'film-studies', display_flag: 'Film Studies', short_name: 'FS' },
      { subject_category_id: 2, flag: 'visual-arts', display_flag: 'Visual Arts', short_name: 'VA' },
      { subject_category_id: 2, flag: 'architecture', display_flag: 'Architecture', short_name: 'Arch' },
      { subject_category_id: 2, flag: 'photography', display_flag: 'Photography', short_name: 'Photo' },
      { subject_category_id: 2, flag: 'graphic-design', display_flag: 'Graphic Design', short_name: 'GD' },
      { subject_category_id: 2, flag: 'fashion-design', display_flag: 'Fashion Design', short_name: 'FD' },
      { subject_category_id: 2, flag: 'creative-arts', display_flag: 'Creative Arts', short_name: 'CA' },
      { subject_category_id: 2, flag: 'cultural-studies', display_flag: 'Cultural Studies', short_name: 'CS' },
      { subject_category_id: 2, flag: 'linguistics', display_flag: 'Linguistics', short_name: 'Ling' },
      { subject_category_id: 2, flag: 'religious-studies', display_flag: 'Religious Studies', short_name: 'RS' },

      // Business and Management
      { subject_category_id: 3, flag: 'business-studies', display_flag: 'Business Studies', short_name: 'BS' },
      { subject_category_id: 3, flag: 'marketing', display_flag: 'Marketing', short_name: 'Mkt' },
      { subject_category_id: 3, flag: 'finance', display_flag: 'Finance', short_name: 'Fin' },
      { subject_category_id: 3, flag: 'accounting', display_flag: 'Accounting', short_name: 'Acc' },
      { subject_category_id: 3, flag: 'entrepreneurship', display_flag: 'Entrepreneurship', short_name: 'Ent' },
      { subject_category_id: 3, flag: 'management', display_flag: 'Management', short_name: 'Mgmt' },
      { subject_category_id: 3, flag: 'human-resources', display_flag: 'Human Resources', short_name: 'HR' },
      { subject_category_id: 3, flag: 'business-analytics', display_flag: 'Business Analytics', short_name: 'BA' },
      { subject_category_id: 3, flag: 'supply-chain-management', display_flag: 'Supply Chain Management', short_name: 'SCM' },
      { subject_category_id: 3, flag: 'international-business', display_flag: 'International Business', short_name: 'IB' },
      { subject_category_id: 3, flag: 'organizational-behavior', display_flag: 'Organizational Behavior', short_name: 'OB' },
      { subject_category_id: 3, flag: 'leadership-studies', display_flag: 'Leadership Studies', short_name: 'LS' },

      // Health and Medicine
      { subject_category_id: 4, flag: 'medicine', display_flag: 'Medicine', short_name: 'Med' },
      { subject_category_id: 4, flag: 'public-health', display_flag: 'Public Health', short_name: 'PH' },
      { subject_category_id: 4, flag: 'nursing', display_flag: 'Nursing', short_name: 'Nrs' },
      { subject_category_id: 4, flag: 'psychology', display_flag: 'Psychology', short_name: 'Psy' },
      { subject_category_id: 4, flag: 'nutrition', display_flag: 'Nutrition', short_name: 'Nut' },
      { subject_category_id: 4, flag: 'pharmacology', display_flag: 'Pharmacology', short_name: 'Pharm' },
      { subject_category_id: 4, flag: 'dentistry', display_flag: 'Dentistry', short_name: 'Dent' },
      { subject_category_id: 4, flag: 'veterinary-science', display_flag: 'Veterinary Science', short_name: 'Vet' },
      { subject_category_id: 4, flag: 'occupational-therapy', display_flag: 'Occupational Therapy', short_name: 'OT' },
      { subject_category_id: 4, flag: 'physiotherapy', display_flag: 'Physiotherapy', short_name: 'PT' },
      { subject_category_id: 4, flag: 'epidemiology', display_flag: 'Epidemiology', short_name: 'Epi' },
      { subject_category_id: 4, flag: 'medical-laboratory-science', display_flag: 'Medical Laboratory Science', short_name: 'MLS' },
      { subject_category_id: 4, flag: 'healthcare-administration', display_flag: 'Healthcare Administration', short_name: 'HA' },

      // Languages and Literature
      { subject_category_id: 5, flag: 'english', display_flag: 'English', short_name: 'Eng' },
      { subject_category_id: 5, flag: 'local-languages', display_flag: 'Local Languages', short_name: 'LocLang' },
      { subject_category_id: 5, flag: 'literature', display_flag: 'Literature', short_name: 'Lit' },
      { subject_category_id: 5, flag: 'poetry', display_flag: 'Poetry', short_name: 'Poet' },
      { subject_category_id: 5, flag: 'prose', display_flag: 'Prose', short_name: 'Prose' },
      { subject_category_id: 5, flag: 'fiction', display_flag: 'Fiction', short_name: 'Fic' },
      { subject_category_id: 5, flag: 'non-fiction', display_flag: 'Non-fiction', short_name: 'NonFic' },
      { subject_category_id: 5, flag: 'linguistics', display_flag: 'Linguistics', short_name: 'Ling' },
      { subject_category_id: 5, flag: 'grammar', display_flag: 'Grammar', short_name: 'Gram' },
      { subject_category_id: 5, flag: 'creative-writing', display_flag: 'Creative Writing', short_name: 'CW' },
      { subject_category_id: 5, flag: 'translation', display_flag: 'Translation', short_name: 'Trans' },

      // Law and Governance
      { subject_category_id: 6, flag: 'law', display_flag: 'Law', short_name: 'Law' },
      { subject_category_id: 6, flag: 'constitutional-law', display_flag: 'Constitutional Law', short_name: 'CL' },
      { subject_category_id: 6, flag: 'criminal-law', display_flag: 'Criminal Law', short_name: 'CrimL' },
      { subject_category_id: 6, flag: 'civil-law', display_flag: 'Civil Law', short_name: 'CivL' },
      { subject_category_id: 6, flag: 'corporate-law', display_flag: 'Corporate Law', short_name: 'CorpL' },
      { subject_category_id: 6, flag: 'international-law', display_flag: 'International Law', short_name: 'IntL' },
      { subject_category_id: 6, flag: 'environmental-law', display_flag: 'Environmental Law', short_name: 'EnvL' },
      { subject_category_id: 6, flag: 'human-rights-law', display_flag: 'Human Rights Law', short_name: 'HRL' },
      { subject_category_id: 6, flag: 'public-policy', display_flag: 'Public Policy', short_name: 'PP' },
      { subject_category_id: 6, flag: 'political-science', display_flag: 'Political Science', short_name: 'PolSci' },
      { subject_category_id: 6, flag: 'international-relations', display_flag: 'International Relations', short_name: 'IR' },
      { subject_category_id: 6, flag: 'forensic-science', display_flag: 'Forensic Science', short_name: 'ForSci' },

      // Mathematics and Logic
      { subject_category_id: 7, flag: 'arithmetic', display_flag: 'Arithmetic', short_name: 'Arith' },
      { subject_category_id: 7, flag: 'mathematics', display_flag: 'Mathematics', short_name: 'Math' },
      { subject_category_id: 7, flag: 'algebra', display_flag: 'Algebra', short_name: 'Alg' },
      { subject_category_id: 7, flag: 'geometry', display_flag: 'Geometry', short_name: 'Geo' },
      { subject_category_id: 7, flag: 'trigonometry', display_flag: 'Trigonometry', short_name: 'Trig' },
      { subject_category_id: 7, flag: 'calculus', display_flag: 'Calculus', short_name: 'Calc' },
      { subject_category_id: 7, flag: 'statistics', display_flag: 'Statistics', short_name: 'Stat' },
      { subject_category_id: 7, flag: 'probability', display_flag: 'Probability', short_name: 'Prob' },
      { subject_category_id: 7, flag: 'linear-algebra', display_flag: 'Linear Algebra', short_name: 'LA' },
      { subject_category_id: 7, flag: 'differential-equations', display_flag: 'Differential Equations', short_name: 'DE' },
      { subject_category_id: 7, flag: 'logic-and-set-theory', display_flag: 'Logic and Set Theory', short_name: 'LST' },
      { subject_category_id: 7, flag: 'number-theory', display_flag: 'Number Theory', short_name: 'NT' },
      { subject_category_id: 7, flag: 'mathematical-modeling', display_flag: 'Mathematical Modeling', short_name: 'MM' },

      // Physical Education and Sports
      { subject_category_id: 8, flag: 'sports-science', display_flag: 'Sports Science', short_name: 'SSci' },
      { subject_category_id: 8, flag: 'fitness-and-health-education', display_flag: 'Fitness and Health Education', short_name: 'FHE' },
      { subject_category_id: 8, flag: 'sports-management', display_flag: 'Sports Management', short_name: 'SM' },
      { subject_category_id: 8, flag: 'kinesiology', display_flag: 'Kinesiology', short_name: 'Kine' },
      { subject_category_id: 8, flag: 'exercise-science', display_flag: 'Exercise Science', short_name: 'ES' },
      { subject_category_id: 8, flag: 'athletic-training', display_flag: 'Athletic Training', short_name: 'AT' },
      { subject_category_id: 8, flag: 'coaching', display_flag: 'Coaching', short_name: 'C' }
    ])
  }
}
