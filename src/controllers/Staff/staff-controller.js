const Panel = require("../../models/panel");

//Get Panel by Member Id
exports.getPanelByMemberId = (req, res) => {
  const { panelId } = req.params;
  if (panelId) {
    //  console.log(memberId);
    Panel.findOne({ panelId: panelId }).exec((error, panel) => {
      if (error) return res.status(400).json({ error });
      if (panel) {
        res.status(201).json({ panel });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};
