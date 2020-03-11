function queue(arr, size){
  if(size > arr.length){ return;}
  var allResult = [];

  (function(arr, size, result){
    if(result.length == size){
      allResult.push(result.join(''));
    }else{
      for(var i =0 ,len = arr.length;i < len; i++){
        var newArr = [].concat(arr),
            curItem = newArr[i]; // newArr.splice(i,1)
        arguments.callee(newArr, size, [].concat(result,curItem));
      }
    }
  })(arr, size, []);

  return allResult;
}
