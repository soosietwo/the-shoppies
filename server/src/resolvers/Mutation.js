const addNominee = (parent, args, context) => {
  return context.prisma.createNominee({
    ...args,
  });
};

const deleteNominee = (parent, args, context, info) => {
  return context.prisma.deleteNominee({ id: args.id });
};

module.exports = {
  addNominee,
  deleteNominee,
};
