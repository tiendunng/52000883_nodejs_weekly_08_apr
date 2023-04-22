const { verify } = require('jsonwebtoken');
var Account = require('../models/account');

const verifyToken = async (token, secretKey) => {
	try {
		return await verify(token, secretKey);
	} catch (error) {
		console.log(`Error in verify access token:  + ${error}`);
		return null;
	}
};

exports.jwtTokenValidator = async (req, res, next) => {
  //console.log(req.headers);
	if (!req.headers.authorization) {
		return res.status(401).json({
			message: "Unauthorized"
		  });
	}
  const accessTokenFromHeader = req.headers.authorization.split(" ")[1];
  //console.log(accessTokenFromHeader)
  if(!accessTokenFromHeader) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  const signingKey = process.env.ACCESS_TOKEN;

  const verified = await verifyToken(
		accessTokenFromHeader,
		signingKey,
	);

  if (!verified) {
		return res
			.status(401)
			.json({
        message: "Unauthorized"
      });
	}

	const user = await Account.findById(verified.payload);
	//console.log(user);
	req.user = user;

	return next();
};
