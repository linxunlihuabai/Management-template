import Mock from 'mockjs'

var arr = []
for (let i = 0; i < 4; i++) {
  const item = Mock.mock({
    'id': '@id',
    'name': '@name',
    'children|3-8': [{
      'id': '@id',
      'name': '@name',
      'type': '@sentence(3, 5)',
      'company': '@title(3, 5)',
      'date': '@date'
    }]
  })
  arr.push(item) // 将模拟的数据放到数组中
}

const add = function(option) {
  console.log(option)
}

Mock.mock('http://localhost:9528/api/classifiedManagement', 'get', { list: arr })
Mock.mock('http://localhost:9528/api/addclassifiedManagement', 'post', add)

// export default [
//   {
//     url: '/table/list',
//     type: 'get',
//     response: config => {
//       const items = data.items
//       return {
//         code: 20000,
//         data: {
//           total: items.length,
//           items: items
//         }
//       }
//     }
//   }
// ]
