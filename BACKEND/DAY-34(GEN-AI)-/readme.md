so we have followed the exact step  from last folder and now we want to implement a feature in out existing code that is out ai can send email to a email address we will crate a tool (tools r basically functions the AI user to perform specified task ) 

sending email we have already implemented using node mailer
// now we have made services mail.service.js 
// now got to tools sectiion of langchain 
import {tool,langchain}
instral zod // zod tells ai to follow a format of o/p
{
  messages: [
    HumanMessage {
      "id": "e1d9f774-a658-498e-938c-73d17211f9db",
      "content": "hey",
      "additional_kwargs": {},
      "response_metadata": {}
    },
    AIMessageChunk {
      "id": "c78da51d-e764-4a8b-b8c8-c21e75b86af2",
      "content": "Hello! How can I assist you today? 😊",
      "name": "model",
      "additional_kwargs": {},
      "response_metadata": {
        "estimatedTokenUsage": {},
        "prompt": 0,
        "completion": 0,
        "model": "ministral-14b-latest",
        "finishReason": "stop"
      },
      "tool_calls": [],
      "tool_call_chunks": [],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "input_tokens": 242,
        "output_tokens": 13,
        "total_tokens": 255,
        "input_token_details": {},
        "output_token_details": {}
      }
    }
  ]
}
You: hello\
{
  messages: [
    HumanMessage {
      "id": "e1d9f774-a658-498e-938c-73d17211f9db",
      "content": "hey",
      "additional_kwargs": {},
      "response_metadata": {}
    },
    AIMessageChunk {
      "id": "c78da51d-e764-4a8b-b8c8-c21e75b86af2",
      "content": "Hello! How can I assist you today? 😊",
      "name": "model",
      "additional_kwargs": {},
      "response_metadata": {
        "estimatedTokenUsage": {},
        "prompt": 0,
        "completion": 0,
        "model": "ministral-14b-latest",
        "finishReason": "stop"
      },
      "tool_calls": [],
      "tool_call_chunks": [],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "input_tokens": 242,
        "output_tokens": 13,
        "total_tokens": 255,
        "input_token_details": {},
        "output_token_details": {}
      }
    },
    HumanMessage {
      "id": "67673ed0-bd05-4069-9ce7-c91bf199f274",
      "content": "hello\\",
      "additional_kwargs": {},
      "response_metadata": {}
    },
    AIMessageChunk {
      "id": "5626a5be-cb3e-48a3-88eb-b074594e2a03",
      "content": "Hi again! How can I help you? 😊",
      "name": "model",
      "additional_kwargs": {},
      "response_metadata": {
        "estimatedTokenUsage": {},
        "prompt": 0,
        "completion": 0,
        "model": "ministral-14b-latest",
        "finishReason": "stop"
      },
      "tool_calls": [],
      "tool_call_chunks": [],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "input_tokens": 259,
        "output_tokens": 13,
        "total_tokens": 272,
        "input_token_details": {},
        "output_token_details": {}
      }
    }
  ]
}
You: cau sent a email to subhodip31xd@gmail.com , subject tests mail , body testmail
Message sent: <00a0e598-fbf7-9255-6b5d-c0e8e4ec6612@gmail.com>
{
  messages: [
    HumanMessage {
      "id": "e1d9f774-a658-498e-938c-73d17211f9db",
      "content": "hey",
      "additional_kwargs": {},
      "response_metadata": {}
    },
    AIMessageChunk {
      "id": "c78da51d-e764-4a8b-b8c8-c21e75b86af2",
      "content": "Hello! How can I assist you today? 😊",
      "name": "model",
      "additional_kwargs": {},
      "response_metadata": {
        "estimatedTokenUsage": {},
        "prompt": 0,
        "completion": 0,
        "model": "ministral-14b-latest",
        "finishReason": "stop"
      },
      "tool_calls": [],
      "tool_call_chunks": [],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "input_tokens": 242,
        "output_tokens": 13,
        "total_tokens": 255,
        "input_token_details": {},
        "output_token_details": {}
      }
    },
    HumanMessage {
      "id": "67673ed0-bd05-4069-9ce7-c91bf199f274",
      "content": "hello\\",
      "additional_kwargs": {},
      "response_metadata": {}
    },
    AIMessageChunk {
      "id": "5626a5be-cb3e-48a3-88eb-b074594e2a03",
      "content": "Hi again! How can I help you? 😊",
      "name": "model",
      "additional_kwargs": {},
      "response_metadata": {
        "estimatedTokenUsage": {},
        "prompt": 0,
        "completion": 0,
        "model": "ministral-14b-latest",
        "finishReason": "stop"
      },
      "tool_calls": [],
      "tool_call_chunks": [],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "input_tokens": 259,
        "output_tokens": 13,
        "total_tokens": 272,
        "input_token_details": {},
        "output_token_details": {}
      }
    },
    HumanMessage {
      "id": "547e5cd9-c03e-4bd5-8cdd-66d5fb7e5cb0",
      "content": "cau sent a email to subhodip31xd@gmail.com , subject tests mail , body testmail",
      "additional_kwargs": {},
      "response_metadata": {}
    },
    AIMessageChunk {
      "id": "8bd46096-139b-4084-ae99-d09b9ee8b2e7",
      "content": "",
      "name": "model",
      "additional_kwargs": {},
      "response_metadata": {
        "estimatedTokenUsage": {},
        "prompt": 0,
        "completion": 0,
        "model": "ministral-14b-latest",
        "finishReason": "tool_calls"
      },
      "tool_calls": [
        {
          "name": "emailTool",
          "args": {
            "to": "subhodip31xd@gmail.com",
            "subject": "tests mail",
            "html": "testmail"
          },
          "id": "hfazrgnFM",
          "type": "tool_call"
        }
      ],
      "tool_call_chunks": [
        {
          "name": "emailTool",
          "args": "{\"to\": \"subhodip31xd@gmail.com\", \"subject\": \"tests mail\", \"html\": \"testmail\"}",
          "id": "hfazrgnFM",
          "index": 0,
          "type": "tool_call_chunk"
        }
      ],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "input_tokens": 296,
        "output_tokens": 32,
        "total_tokens": 328
      }
    },
    ToolMessage {
      "id": "98219801-bca0-4e28-abc4-58e4fb6a52d7",
      "content": "{\"accepted\":[\"subhodip31xd@gmail.com\"],\"rejected\":[],\"ehlo\":[\"SIZE 35882577\",\"8BITMIME\",\"AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH\",\"ENHANCEDSTATUSCODES\",\"PIPELINING\",\"CHUNKING\",\"SMTPUTF8\"],\"envelopeTime\":1014,\"messageTime\":700,\"messageSize\":287,\"response\":\"250 2.0.0 OK  1790534477 d2e1a72fcca58-87fea19800esm3119584b3a.10 - gsmtp\",\"envelope\":{\"from\":\"subhodip31xd@gmail.com\",\"to\":[\"subhodip31xd@gmail.com\"]},\"messageId\":\"<00a0e598-fbf7-9255-6b5d-c0e8e4ec6612@gmail.com>\"}",
      "name": "emailTool",
      "additional_kwargs": {},
      "response_metadata": {},
      "tool_call_id": "hfazrgnFM"
    },
    AIMessageChunk {
      "id": "d1df959a-3c47-41ef-8e5f-adaf2f8c9da0",
      "content": "The email has been successfully sent to **subhodip31xd@gmail.com**! 🎉\n\nHere are the details:\n- **Subject:** *tests mail*\n- **Body:** *testmail*",
      "name": "model",
      "additional_kwargs": {},
      "response_metadata": {
        "estimatedTokenUsage": {},
        "prompt": 0,
        "completion": 0,
        "model": "ministral-14b-latest",
        "finishReason": "stop"
      },
      "tool_calls": [],
      "tool_call_chunks": [],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "input_tokens": 575,
        "output_tokens": 44,
        "total_tokens": 619,
        "input_token_details": {},
        "output_token_details": {}
      }
    }
  ]
}
## tavily documentation........ TASK 