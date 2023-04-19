const { ServerModel } = require("../models/devices-model");
const RemoteDesktop = require("../models/remote-desktop-model");
const { StatusCodes } = require("http-status-codes");

const addServer = async (req, res) => {
  // console.log(req.body);
  const server = await ServerModel.create({ ...req.body });

  return res
    .status(StatusCodes.CREATED)
    .json({ message: "server added successfully", data: server });
};

const getServers = async (req, res) => {
  const servers = await ServerModel.find({
    faulty: false,
    decommissioned: false,
  });
  return res.status(StatusCodes.OK).json({ data: servers });
};

const getServer = async (req, res) => {
  const serverId = req.params.serverId;
  const server = await ServerModel.findById(serverId);

  return res.status(StatusCodes.OK).json({ data: server });
};

const updateServer = async (req, res) => {
  const serverId = req.params.serverId;

  // console.log(serverId);

  const server = await ServerModel.findOneAndUpdate(
    { _id: serverId },
    {
      ...req.body,
    },
    { new: true, runValidators: true }
  );

  return res
    .status(StatusCodes.OK)
    .json({ message: "server updated successfully.", data: server });
};

const deleteServer = async (req, res) => {
  const serverId = req.params.serverId;
  const server = await ServerModel.findOneAndDelete({ _id: serverId });
  //also delete the corresponding remote address
  const remoteAddress = await RemoteDesktop.findOneAndDelete({ serverId });

  return res
    .status(StatusCodes.OK)
    .json({ message: "server deleted successfully." });
};

module.exports = {
  addServer,
  getServer,
  getServers,
  updateServer,
  deleteServer,
};
