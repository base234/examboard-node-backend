import vine from '@vinejs/vine'

export const createCandidateAuthValidator = vine.compile(
  vine.object({
    candidate_id: vine.string(),
    password: vine.string()
  })
)
