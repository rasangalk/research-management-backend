const Template = require("../../models/template");
const Submission = require("../../models/submission");

//Admin add template
exports.AddTemplate = (req, res) => {
  const { caption } = req.body;

  let researchTemplates = [];

  if (req.files.length > 0) {
    researchTemplates = req.files.map((file) => {
      return { template: file.filename };
    });
  }

  const template = new Template({
    caption,
    researchTemplates,
    // createdBy: req.user._id,
  });

  template.save((error, template) => {
    if (error) return res.status(400).json({ error });
    if (template) {
      res.status(201).json({ template });
    }
  });
};

//Admin Delete relevant template by id
exports.DeleteTemplate = (req, res) => {
  const { templateId } = req.params;
  Template.findOneAndDelete({ _id: templateId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Get all the templates
exports.getTemplates = (req, res) => {
  Template.find({}).exec((error, templates) => {
    if (error) return res.status(400).json({ error });

    if (templates) {
      res.status(200).json({
        templates,
      });
    }
  });
};

//Admin create submission
exports.createSubmission = (req, res) => {
  const { caption, description, deadlineDate, deadlineTime } = req.body;

  const submission = new Submission({
    caption,
    description,
    deadlineDate,
    deadlineTime,
  });

  submission.save((error, submission) => {
    if (error) return res.status(400).json({ error });
    if (submission) {
      res.status(201).json({ submission });
    }
  });
};

//Get all the submissions
exports.getSubmissions = (req, res) => {
  Submission.find({}).exec((error, submissions) => {
    if (error) return res.status(400).json({ error });

    if (submissions) {
      res.status(200).json({
        submissions,
      });
    }
  });
};

//Get relevant created submission by id
exports.getSubmissionDetailsById = (req, res) => {
  const { submissionId } = req.params;
  if (submissionId) {
    Submission.findOne({ _id: submissionId }).exec((error, submission) => {
      if (error) return res.status(400).json({ error });
      if (submission) {
        res.status(201).json({ submission });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

//Update relevant submission
exports.UpdateSubmission = (req, res) => {
  const { submissionId } = req.body;
  if (submissionId) {
    Submission.findOneAndUpdate(
      { _id: submissionId },
      {
        caption: req.body.movieName,
        description: req.body.description,
        deadlineDate: req.body.deadlineDate,
        deadlineTime: req.body.deadlineTime,
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};
