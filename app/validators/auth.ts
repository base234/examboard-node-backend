import vine from '@vinejs/vine'

const password = vine.string().minLength(8).maxLength(32);

export const registerValidator = vine.compile(
  vine.object({
    data: vine.object({
      first_name: vine.string().minLength(2).maxLength(32),
      last_name: vine.string().minLength(2).maxLength(32),
      email: vine.string().email().normalizeEmail().unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first();
        return !match;
      }),
      password
    })
  })
)

export const loginValidator = vine.compile(
  vine.object({
    data: vine.object({
      email: vine.string().email().normalizeEmail(),
      password,
      rememberMe: vine.boolean().optional(),
    })
  })
)
