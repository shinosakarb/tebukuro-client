export const event = {
  all: '/events',
  find: '/events/:id',
  create: '/events',
  update: '/events/:id',
  delete: '/events/:id',
}

export const participant = {
  create: '/events/:eventId/participants',
}
