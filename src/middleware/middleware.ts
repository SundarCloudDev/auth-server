import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = 'Test@123'; 

export const verifyToken = (req: Request | any, res: Response | any, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
        console.log(err);
        
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();  
  });
};

export const verifyAdmin = (req: Request | any, res: Response | any, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1]; 
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
          console.log(err);
          
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
      if(decoded.role == 'admin'){
        req.user = decoded;
        next();  
      }
      else{
        return res.status(401).json({ message: 'Access Restricted' });
      }
      
    });
  };
  

