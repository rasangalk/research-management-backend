const Panel = require("../../models/panel");

//Get Panel by Member Id
exports.getPanelByMemberId = (req, res) => {
  const { memberId } = req.params;
  if (memberId) {
    console.log(memberId);
    Panel.find({
      $or: [
        {
          panelMembers: {
            member1: {
              memberId: memberId,
            },
          },
        },
        {
          panelMembers: {
            member2: {
              memberId: memberId,
            },
          },
        },
        {
          panelMembers: {
            member3: {
              memberId: memberId,
            },
          },
        },
      ],
    }).exec((error, panel) => {
      if (error) return res.status(400).json({ error });
      if (panel) {
        res.status(201).json({ panel });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};
