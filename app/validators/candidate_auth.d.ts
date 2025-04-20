declare module '#validators/candidate_auth' {
  import { VineValidator } from '@vinejs/vine'

  export const createCandidateAuthValidator: VineValidator<{
    candidate_id: string
    password: string
  }>
}
