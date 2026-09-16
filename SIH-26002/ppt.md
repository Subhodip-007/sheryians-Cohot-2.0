                  ┌──────────────┐
                    │     USER     │
                    └──────┬───────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  React Frontend │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Express REST API│
                  └────────┬────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Business Services   │
                ├─────────────────────┤
                │ Shipment            │
                │ Route               │
                │ Incident            │
                │ Risk                │
                │ Accessibility       │
                │ Recommendation      │
                └──────────┬──────────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
         MongoDB        Map API       Weather API
                           │             │
                           └──────┬──────┘
                                  ▼
                           Intelligence
                              Engine
                                  │
                        ┌─────────┴──────────┐
                        ▼                    ▼
                     Rule ML               ML Model
                    Prototype               Later
                        │                    │
                        └─────────┬──────────┘
                                  ▼
                            Recommendation
                                  │
                                  ▼
                              Operator
                                  │
                       ┌──────────┴─────────┐
                       ▼                    ▼
                    APPROVE               REJECT
                       │
                       ▼
                    REROUTE
                       │
                       ▼
                    TRACKING