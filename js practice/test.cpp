// print subset 
#include<iostream>
#include<vector>
using namespace std;
void recset(vector<int>&nums,int i,vector<int>temp){
if(i==nums.size()-1){
    cout<<temp[nums[i]];
    return;
}
//nahi lunga
 recset(nums,i+1,temp); 
//lunga 
temp.push_back(nums[i]);
recset(nums,i+1,temp);
temp.pop_back();

}
int main(){
vector<int>arr={1,2,3};
vector<int> temp;
recset(arr,0,temp);
}
