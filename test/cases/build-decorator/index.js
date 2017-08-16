
const calls = [];

function dec(id){
  calls.push(id);
  return function(){};
}

@dec(1)
class Example {
}

