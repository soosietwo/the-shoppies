const nominees = async (parent, args, context) => {
  return await context.prisma.nominees();
};

const nomineesConnection = async (parent, args, context) => {
  const aggregate = await context.prisma.nomineesConnection().aggregate();
  const pageInfo = await context.prisma.nomineesConnection().pageInfo();
  const edges = await context.prisma.nomineesConnection().edges();
  return { aggregate, pageInfo, edges };
};

module.exports = {
  nominees,
  nomineesConnection,
};
