//seajs.use('/js/a');
seajs.use(['/js/a'],function(a){
    console.info(a);
})