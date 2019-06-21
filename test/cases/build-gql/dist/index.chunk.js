(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUERY_CLUSTERS", function() { return QUERY_CLUSTERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUERY_CLUSTER", function() { return QUERY_CLUSTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SAVE_CLUSTER", function() { return SAVE_CLUSTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_CLUSTER", function() { return DELETE_CLUSTER; });
var QUERY_CLUSTERS = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "query",
    "name": {
      "kind": "Name",
      "value": "queryClusters"
    },
    "variableDefinitions": [],
    "directives": [],
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "alias": undefined,
        "name": {
          "kind": "Name",
          "value": "clusters"
        },
        "arguments": [],
        "directives": [],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [{
            "kind": "Field",
            "alias": undefined,
            "name": {
              "kind": "Name",
              "value": "id"
            },
            "arguments": [],
            "directives": [],
            "selectionSet": undefined
          }, {
            "kind": "Field",
            "alias": undefined,
            "name": {
              "kind": "Name",
              "value": "name"
            },
            "arguments": [],
            "directives": [],
            "selectionSet": undefined
          }, {
            "kind": "Field",
            "alias": undefined,
            "name": {
              "kind": "Name",
              "value": "endpoint"
            },
            "arguments": [],
            "directives": [],
            "selectionSet": undefined
          }, {
            "kind": "Field",
            "alias": undefined,
            "name": {
              "kind": "Name",
              "value": "secret"
            },
            "arguments": [],
            "directives": [],
            "selectionSet": undefined
          }]
        }
      }]
    }
  }],
  "loc": {
    "start": 0,
    "end": 98,
    "source": {
      "body": "\n  query queryClusters {\n    clusters {\n      id\n      name\n      endpoint\n      secret\n    }\n  }\n",
      "name": "GraphQL request",
      "locationOffset": {
        "line": 1,
        "column": 1
      }
    }
  }
};
var QUERY_CLUSTER = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "query",
    "name": {
      "kind": "Name",
      "value": "queryCluster"
    },
    "variableDefinitions": [{
      "kind": "VariableDefinition",
      "variable": {
        "kind": "Variable",
        "name": {
          "kind": "Name",
          "value": "input"
        }
      },
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "dashboard_clusterEp_getInput"
          }
        }
      },
      "defaultValue": undefined,
      "directives": []
    }],
    "directives": [],
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "alias": undefined,
        "name": {
          "kind": "Name",
          "value": "cluster"
        },
        "arguments": [{
          "kind": "Argument",
          "name": {
            "kind": "Name",
            "value": "input"
          },
          "value": {
            "kind": "Variable",
            "name": {
              "kind": "Name",
              "value": "input"
            }
          }
        }],
        "directives": [],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [{
            "kind": "Field",
            "alias": undefined,
            "name": {
              "kind": "Name",
              "value": "id"
            },
            "arguments": [],
            "directives": [],
            "selectionSet": undefined
          }, {
            "kind": "Field",
            "alias": undefined,
            "name": {
              "kind": "Name",
              "value": "name"
            },
            "arguments": [],
            "directives": [],
            "selectionSet": undefined
          }, {
            "kind": "Field",
            "alias": undefined,
            "name": {
              "kind": "Name",
              "value": "endpoint"
            },
            "arguments": [],
            "directives": [],
            "selectionSet": undefined
          }, {
            "kind": "Field",
            "alias": undefined,
            "name": {
              "kind": "Name",
              "value": "secret"
            },
            "arguments": [],
            "directives": [],
            "selectionSet": undefined
          }]
        }
      }]
    }
  }],
  "loc": {
    "start": 0,
    "end": 150,
    "source": {
      "body": "\n  query queryCluster($input: dashboard_clusterEp_getInput!) {\n    cluster(input: $input) {\n      id\n      name\n      endpoint\n      secret\n    }\n  }\n",
      "name": "GraphQL request",
      "locationOffset": {
        "line": 1,
        "column": 1
      }
    }
  }
};
var SAVE_CLUSTER = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "mutation",
    "name": {
      "kind": "Name",
      "value": "saveCluster"
    },
    "variableDefinitions": [{
      "kind": "VariableDefinition",
      "variable": {
        "kind": "Variable",
        "name": {
          "kind": "Name",
          "value": "input"
        }
      },
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "dashboard_clusterEp_saveInput"
          }
        }
      },
      "defaultValue": undefined,
      "directives": []
    }],
    "directives": [],
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "alias": undefined,
        "name": {
          "kind": "Name",
          "value": "saveCluster"
        },
        "arguments": [{
          "kind": "Argument",
          "name": {
            "kind": "Name",
            "value": "input"
          },
          "value": {
            "kind": "Variable",
            "name": {
              "kind": "Name",
              "value": "input"
            }
          }
        }],
        "directives": [],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [{
            "kind": "Field",
            "alias": undefined,
            "name": {
              "kind": "Name",
              "value": "clientMutationId"
            },
            "arguments": [],
            "directives": [],
            "selectionSet": undefined
          }]
        }
      }]
    }
  }],
  "loc": {
    "start": 0,
    "end": 132,
    "source": {
      "body": "\n  mutation saveCluster($input: dashboard_clusterEp_saveInput!) {\n    saveCluster(input: $input) {\n      clientMutationId\n    }\n  }\n",
      "name": "GraphQL request",
      "locationOffset": {
        "line": 1,
        "column": 1
      }
    }
  }
};
var DELETE_CLUSTER = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "mutation",
    "name": {
      "kind": "Name",
      "value": "deleteCluster"
    },
    "variableDefinitions": [{
      "kind": "VariableDefinition",
      "variable": {
        "kind": "Variable",
        "name": {
          "kind": "Name",
          "value": "input"
        }
      },
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "dashboard_clusterEp_deleteInput"
          }
        }
      },
      "defaultValue": undefined,
      "directives": []
    }],
    "directives": [],
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "alias": undefined,
        "name": {
          "kind": "Name",
          "value": "deleteCluster"
        },
        "arguments": [{
          "kind": "Argument",
          "name": {
            "kind": "Name",
            "value": "input"
          },
          "value": {
            "kind": "Variable",
            "name": {
              "kind": "Name",
              "value": "input"
            }
          }
        }],
        "directives": [],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [{
            "kind": "Field",
            "alias": undefined,
            "name": {
              "kind": "Name",
              "value": "clientMutationId"
            },
            "arguments": [],
            "directives": [],
            "selectionSet": undefined
          }]
        }
      }]
    }
  }],
  "loc": {
    "start": 0,
    "end": 138,
    "source": {
      "body": "\n  mutation deleteCluster($input: dashboard_clusterEp_deleteInput!) {\n    deleteCluster(input: $input) {\n      clientMutationId\n    }\n  }\n",
      "name": "GraphQL request",
      "locationOffset": {
        "line": 1,
        "column": 1
      }
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (DELETE_CLUSTER);

/***/ })
],[[0,1]]]);