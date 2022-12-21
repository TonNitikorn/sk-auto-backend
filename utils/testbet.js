
// // bet_number = ["1","2","3",4,5]

// // let bet_number_array = [];
// // bet_number.forEach(function(item) {
// //   bet_number_array.push(parseInt(item));
// // });

// // console.log(bet_number_array);
// // bet_number_array = [1,2,3,4,5];


// // //check win number
// // let win_number = 4;
// // bet_number_array.forEach(function(item) {
// //   // console.log(item);
// //   if(item == win_number) {
// //     console.log("win");
// //   }

// // });

// // let return_data = 
// // [
// //   {
// //       "uuid": "3310b8aa-658c-4c74-a5d5-4c4837047986",
// //       "name": "รอบ 15.17-15.23",
// //       "create_by": "qwe",
// //       "open_datetime": "2022-08-11T08:17:00.000Z",
// //       "close_datetime": "2022-08-11T08:23:00.000Z",
// //       "result": "2"
// //   },
// //   {
// //       "uuid": "7ce4583f-06c8-4510-afe6-c87858e2ffe4",
// //       "name": "เทสออกผล",
// //       "create_by": "qwe",
// //       "open_datetime": "2022-08-11T03:38:00.000Z",
// //       "close_datetime": "2022-08-11T04:00:00.000Z",
// //       "result": null
// //   },
// //   {
// //       "uuid": "2fad1ea1-31c5-4e4a-bbd0-5cf80a9b85c2",
// //       "name": "Round 1 17:20-18:20",
// //       "create_by": "system",
// //       "open_datetime": "2022-08-10T10:20:00.000Z",
// //       "close_datetime": "2022-08-10T10:40:00.000Z",
// //       "result": "1"
// //   }
// // ];

// // let data_out = [];
// // let link;
// // let data;
// // return_data.forEach(function(item) {
// //   if (item.result != null) {
// //     data = {
// //       "uuid": item.uuid,
// //       "name": item.name,
// //       "open_datetime": item.open_datetime,
// //       "close_datetime": item.close_datetime,
// //       "result": item.result,
// //       "img": "https://www.google.com/search?q=" + item.result
// //     }
// //     data_out.push(data);
// //   }
// // });
// // console.log(data_out);


// let data = [
//   {
//     "NumberBet": "4",
//     "TotalPrice": "1850.00",
//     "WinPrice": "19575.00",
//     "RoundUUID": "d162e1de-40ec-453d-97f9-7c9bffb01858"
// },
// {
//     "NumberBet": "8",
//     "TotalPrice": "1666.67",
//     "WinPrice": "18000.00",
//     "RoundUUID": "d162e1de-40ec-453d-97f9-7c9bffb01858"
// },
// {
//     "NumberBet": "10",
//     "TotalPrice": "1666.67",
//     "WinPrice": "18000.00",
//     "RoundUUID": "d162e1de-40ec-453d-97f9-7c9bffb01858"
// },
// {
//     "NumberBet": "5",
//     "TotalPrice": "1916.67",
//     "WinPrice": "16225.00",
//     "RoundUUID": "d162e1de-40ec-453d-97f9-7c9bffb01858"
// },
// {
//     "NumberBet": "9",
//     "TotalPrice": "1733.33",
//     "WinPrice": "14650.00",
//     "RoundUUID": "d162e1de-40ec-453d-97f9-7c9bffb01858"
// },
// {
//     "NumberBet": "2",
//     "TotalPrice": "583.33",
//     "WinPrice": "5975.00",
//     "RoundUUID": "d162e1de-40ec-453d-97f9-7c9bffb01858"
// },
// {
//     "NumberBet": "1",
//     "TotalPrice": "916.67",
//     "WinPrice": "5225.00",
//     "RoundUUID": "d162e1de-40ec-453d-97f9-7c9bffb01858"
// },
// {
//     "NumberBet": "3",
//     "TotalPrice": "916.67",
//     "WinPrice": "5225.00",
//     "RoundUUID": "d162e1de-40ec-453d-97f9-7c9bffb01858"
// },
// {
//     "NumberBet": "7",
//     "TotalPrice": "833.33",
//     "WinPrice": "4750.00",
//     "RoundUUID": "d162e1de-40ec-453d-97f9-7c9bffb01858"
// },
// {
//     "NumberBet": "11",
//     "TotalPrice": "833.33",
//     "WinPrice": "4750.00",
//     "RoundUUID": "d162e1de-40ec-453d-97f9-7c9bffb01858"
// },
// {
//     "NumberBet": "6",
//     "TotalPrice": "83.33",
//     "WinPrice": "475.00",
//     "RoundUUID": "d162e1de-40ec-453d-97f9-7c9bffb01858"
// },
// {
//     "NumberBet": "12",
//     "TotalPrice": "0.00",
//     "WinPrice": "0.00",
//     "RoundUUID": "d162e1de-40ec-453d-97f9-7c9bffb01858"
// }
// ];

// let sumtotal = 0;
// let totalwin = 0;
// data.forEach(function(item) {
//   let datain = parseFloat(item.TotalPrice);
//   console.log(datain);
//   sumtotal += datain;
// });
// console.log('-------------ผลรวม-------------------');
// console.log(sumtotal);
// // console.log(sumtotal * 0.4);
// console.log('-------------ผล 40%-------------------');
// let total = sumtotal * 0.4;
// console.log(total);
// console.log('-------------ผลที่ต้องจ่าย-------------------');

// let datacal = [];
// data.forEach(function(item) {
//   let datain = parseFloat(item.TotalPrice);
//   totalwin = datain * 10;
//   console.log(totalwin);
//   if (totalwin < total) {
//     let data = {
//       "NumberBet": item.NumberBet,
//       "TotalPrice": item.TotalPrice,
//       "WinPrice": totalwin,
//     }
//     datacal.push(data);
//     // console.log(`cal auto 40%  ${totalwin}`);
//   }
// });
// console.log('--------------ผลใกล้เคียง------------------');
// console.log(datacal);
// console.log('--------------ผลที่ระบบเลือก----------------');
// console.log(datacal[0]);
// console.log('------------------------------------');