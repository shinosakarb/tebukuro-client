export const event = {
  all: '/events',
  find: '/events/:id',
  create: '/events',
  update: '/events/:id',
  delete: '/events/:id',
  cancelRegistration: '/events/:id/registrations',
}

export const participant = {
  create: '/events/:eventId/participants',
  delete: '/events/:eventId/participants/:id',
}

export const auth = {
  valid: '/auth/validate_token',
}
