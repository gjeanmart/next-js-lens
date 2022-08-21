const { ethers } = require("ethers");

export const stripZeros = (data: string) => {
  return ethers.utils.hexStripZeros(data)
}