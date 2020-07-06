async function middleWare(handle){
	return (req,res,next)=>{
		try{
           await handle(req,res);

		}
		catch(ex){
			res.status(500).send('something failed')
            
		}
	}
}
