var cnt = 0 ;
let i;
let a;

for (i = 2; i < process.argv.length; i++)
{
	cnt += Number(process.argv[i]);
}
console.log(cnt);
