const { NetworkConfig, EmailConfig } = require("../models/config-model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/api-error");

const addConfig = async (req, res) => {
  let configs;

  switch (req.params.configType) {
    case "network":
      configs = await NetworkConfig.create({ ...req.body });
      break;
    case "email":
      configs = await EmailConfig.create({ ...req.body });
      break;
    default:
      throw new BadRequestError("Please provide a valid configType");
  }

  return res
    .status(StatusCodes.CREATED)
    .json({ message: "Configurations added successfully", data: configs });
};

const getConfig = async (req, res) => {
  let configs;

  switch (req.params.configType) {
    case "network":
      configs = await NetworkConfig.find();
      break;
    case "email":
      configs = await EmailConfig.find();
      break;
    default:
      throw new BadRequestError("Please provide a valid configType");
  }

  return res.status(StatusCodes.OK).json({ data: configs[0] });
};

const updateConfig = async (req, res) => {
  switch (req.params.configType) {
    case "network":
      configs = await NetworkConfig.findOneAndUpdate(
        { _id: req.params.configId },
        {
          ...req.body,
        },
        { new: true }
      );
      break;
    case "email":
      configs = await EmailConfig.findOneAndUpdate(
        { _id: req.params.configId },
        {
          ...req.body,
        },
        { new: true }
      );
      break;
    default:
      throw new BadRequestError("Please provide a valid configType");
  }

  return res.status(StatusCodes.OK).json({
    message: "Configurations updated successfully.",
    data: configs[0],
  });
};

module.exports = {
  addConfig,
  getConfig,
  updateConfig,
};
