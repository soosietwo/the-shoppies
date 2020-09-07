const addNominee = (parent, args, context) => {
  return context.prisma.createNominee({
    ...args,
  });
};

const deleteNominee = (parent, args, context, info) => {
  return context.prisma.deleteNominee({ id: args.id });
};

const deleteAllNominees = (parent, args, context) => {
  return context.prisma.deleteManyNominees({ id_not: "undefined" });
};

module.exports = {
  addNominee,
  deleteNominee,
  deleteAllNominees,
};
