interface pagination {
  take: number,
  skip: number
}

export const pagination = (take?: string, skip?: string): pagination => {
  let result: pagination

  if(take === '0' || !take){
    result.take = 9
  }else{
    result.take = Number(take)
  }

  if(skip === '0' || !skip){
    result.skip = 0
  }else{
    result.skip = (Number(skip) - 1) * result.take
  }

  return result
};
