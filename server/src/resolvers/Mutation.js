const addNominee = (parent, args, context) => {
  return context.prisma.createNominee({
    ...args,
  });
};

module.exports = {
  addNominee,
};
