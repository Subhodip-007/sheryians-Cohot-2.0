// is typescript
// TS---> JS ---->browser
// if u write a valid JS code it is a TS code 
// but it can throw TS warning but it will run  
var a=12;
a="subh";
// now if i compile using 
// now setting up typescript
// check npm,node,ts--v
// set tsConfig.json
// settings rules
// like if i leave let a; set error
// tsc--init
//npx tsc--init
// tsc --watch auto complie



// basic type 
// primitive (num,str,bool);
// arr
// tuple
// enums
// Any,unknown,void,null,undefined,never

// now what is primitive reference
// if
var a=12 // but a stays 12
var b=a // 12 // but now 14
// and
b+2
// reference () {} []
let arr=[1,2,3,4,56];
let barr=arr;
barr.pop(); // in both 56 will pop due to reference 
// in primitive we use same var let const  but mainly let and const
// arr
let arr2=[1,2,3,4,'shub']

let arr1: number[]=[1,2,3,4,5,6,'shub'];
// tuples size fixed and what will be in following location
let tuple :[string,number]=["shub",20];

// enums (enumerations)
// just like key:value pair like obj but with special power
// just enums use = instead of :
enum StatusCodes {
  // 1xx Informational
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,

  // 2xx Success
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,

  // 3xx Redirection
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,

  // 4xx Client Errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  PAYLOAD_TOO_LARGE = 413,
  UNSUPPORTED_MEDIA_TYPE = 415,
  TOO_MANY_REQUESTS = 429,

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}
StatusCodes.ACCEPTED;