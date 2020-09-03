async function nominees(parent, args, context) {
  const nominees = await context.prisma.nominees();
  return nominees;
}

module.exports = {
  nominees,
};
