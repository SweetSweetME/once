function quickSort(arr, start = 0, end = arr.length - 1){
    if(start - end >= 0){
        return arr;
    }
    const baseValue = arr[end];
    let j = start;
    for( let i=start; i<=end; i++ ){
        if( arr[i] <= baseValue ){
            [arr[i], arr[j]] = [arr[j], arr[i]];
            j++;
        }
        // console.log(j);
    }
    // console.log('***')
    quickSort(arr, start, j - 2);
    quickSort(arr, j, end)
    return arr;
}

const arr = [2, 3, 21, 4, 1, 34, 1, 2];
// [ 2, 1, 1, 2, 3, 4, 21, 34 ]
console.log(quickSort(arr));

// 遇到的问题：return 处写错了 原本想要写：return [...quickSort(arr, start, j - 2), ...quickSort(arr, j, end)]
// 这样子 返回的是好多个arr concat 之后的数组 太傻吊了......
// 刚开始很傻的没有用start end 去初始化函数内的边界值 都用了0 和 arr.length - 1
// quickSort(arr, start, j - 2); 这个j - 2 是试了很多次发现应该是 j-2 本不应该试这么多次
// 每次的baseValue 应该在进行一次比较之后就不要 再动位置了 保持住位置 以它为中心左边再进行排序 右边进行排序 
// [arr[i], arr[j]] = [arr[j], arr[i]];
// j++;
// 因为 j 在交换完位置后 又+1了 所以j 的位置是baseValue的 下一个位置 注意【arr[i] <= baseValue 】 那么前半部分的结束应该是 j - 2 因为j-1是baseValue
// 相信很多人都比我清楚
// 为了不再看完就忘 我要多回来看一看 还要记录一下 加油！
