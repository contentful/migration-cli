import * as Intents from '../intent/index'
import ContentTransform from '../interfaces/content-transform'
import EntryDerive from '../interfaces/entry-derive'
import TransformEntryToType from '../interfaces/entry-transform-to-type'

const actionCreators = {
  contentType: {
    create: (id, instanceId, callsite): Intents.ContentTypeCreate => {
      return new Intents.ContentTypeCreate({
        type: 'contentType/create',
        meta: {
          contentTypeInstanceId: `contentType/${id}/${instanceId}`,
          callsite: {
            file: callsite.getFileName(),
            line: callsite.getLineNumber()
          }
        },
        payload: { contentTypeId: id }
      })
    },
    update: (id, instanceId, callsite, property, value): Intents.ContentTypeUpdate => {
      return new Intents.ContentTypeUpdate({
        type: 'contentType/update',
        meta: {
          contentTypeInstanceId: `contentType/${id}/${instanceId}`,
          callsite: {
            file: callsite.getFileName(),
            line: callsite.getLineNumber()
          }
        },
        payload: {
          contentTypeId: id,
          props: {
            [property]: value
          }
        }
      })
    },
    delete: (id, instanceId, callsite): Intents.ContentTypeDelete => {
      return new Intents.ContentTypeDelete({
        type: 'contentType/delete',
        meta: {
          contentTypeInstanceId: `contentType/${id}/${instanceId}`,
          callsite: {
            file: callsite.getFileName(),
            line: callsite.getLineNumber()
          }
        },
        payload: { contentTypeId: id }
      })
    },
    transformEntries: (id, instanceId, transformation: ContentTransform, callsite): Intents.EntryTransform => new Intents.EntryTransform({
      type: 'contentType/transformEntries',
      meta: {
        contentTypeInstanceId: `contentType/${id}/${instanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        transformation,
        contentTypeId: id
      }
    }),
    deriveLinkedEntries: (id, instanceId, derivation: EntryDerive, callsite): Intents.EntryDerive => new Intents.EntryDerive({
      type: 'contentType/deriveEntries',
      meta: {
        contentTypeInstanceId: `contentType/${id}/${instanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        derivation,
        contentTypeId: id
      }
    }),
    transformEntriesToType: (instanceId: number, entryTransformationToType: TransformEntryToType, callsite): Intents.EntryTransformToType => new Intents.EntryTransformToType({
      type: 'contentType/transformEntriesToType',
      meta: {
        contentTypeInstanceId: `contentType/${entryTransformationToType.sourceContentType}/${instanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        entryTransformationToType,
        contentTypeId: entryTransformationToType.sourceContentType
      }
    }),
    changeEditorInterface: (id, instanceId, callsite, fieldId, widgetId, settings = {}): Intents.EditorInterfaceUpdate => new Intents.EditorInterfaceUpdate({
      type: 'contentType/changeEditorInterface',
      meta: {
        contentTypeInstanceId: `contentType/${id}/${instanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        contentTypeId: id,
        editorInterface: {
          fieldId,
          widgetId,
          settings
        }
      }
    }),
    copyEditorInterface: (id, instanceId, callsite, sourceFieldId, destinationFieldId): Intents.EditorInterfaceCopy => new Intents.EditorInterfaceCopy({
      type: 'contentType/copyEditorInterface',
      meta: {
        contentTypeInstanceId: `contentType/${id}/${instanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        contentTypeId: id,
        editorInterfaceCopy: {
          source: sourceFieldId,
          destination: destinationFieldId
        }
      }
    }),
    resetEditorInterface: (id, instanceId, callsite, fieldId): Intents.EditorInterfaceReset => new Intents.EditorInterfaceReset({
      type: 'contentType/resetEditorInterface',
      meta: {
        contentTypeInstanceId: `contentType/${id}/${instanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        contentTypeId: id,
        editorInterfaceReset: {
          fieldId
        }
      }
    }),
    addSidebarWidget: (id, instanceId, callsite, widgetId, widgetNamespace, settings = {}): Intents.SidebarWidgetAdd => new Intents.SidebarWidgetAdd({
      type: 'contentType/addSidebarWidget',
      meta: {
        contentTypeInstanceId: `contentType/${id}/${instanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        contentTypeId: id,
        sidebarWidget: {
          widgetId,
          widgetNamespace,
          settings
        }
      }
    }),
    updateSidebarWidget: (id, instanceId, callsite, widgetId, settings = {}): Intents.SidebarWidgetUpdate => new Intents.SidebarWidgetUpdate({
      type: 'contentType/updateSidebarWidget',
      meta: {
        contentTypeInstanceId: `contentType/${id}/${instanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        contentTypeId: id,
        sidebarWidget: {
          widgetId,
          settings
        }
      }
    }),
    removeSidebarWidget: (id, instanceId, callsite, widgetId): Intents.SidebarWidgetRemove => new Intents.SidebarWidgetRemove({
      type: 'contentType/removeSidebarWidget',
      meta: {
        contentTypeInstanceId: `contentType/${id}/${instanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        contentTypeId: id,
        sidebarWidget: {
          widgetId
        }
      }
    }),
    resetSidebarToDefault: (id, instanceId, callsite): Intents.SidebarResetToDefault => new Intents.SidebarResetToDefault({
      type: 'contentType/resetSidebarToDefault',
      meta: {
        contentTypeInstanceId: `contentType/${id}/${instanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        contentTypeId: id
      }
    })
  },
  field: {
    create: (contentTypeId, contentTypeInstanceId, fieldId, fieldInstanceId, callsite): Intents.FieldCreate => new Intents.FieldCreate({
      type: 'field/create',
      meta: {
        contentTypeInstanceId: `contentType/${contentTypeId}/${contentTypeInstanceId}`,
        fieldInstanceId: `fields/${fieldId}/${fieldInstanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        contentTypeId,
        fieldId
      }
    }),
    update: (contentTypeId, contentTypeInstanceId, fieldId, fieldInstanceId, callsite, property, value): Intents.FieldUpdate => new Intents.FieldUpdate({
      type: 'field/update',
      meta: {
        contentTypeInstanceId: `contentType/${contentTypeId}/${contentTypeInstanceId}`,
        fieldInstanceId: `fields/${fieldId}/${fieldInstanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        contentTypeId,
        fieldId,
        props: {
          [property]: value
        }
      }
    }),
    move: (contentTypeId, contentTypeInstanceId, fieldId, fieldInstanceId, callsite, movement): Intents.FieldMove => new Intents.FieldMove({
      type: 'field/move',
      meta: {
        contentTypeInstanceId: `contentType/${contentTypeId}/${contentTypeInstanceId}`,
        fieldInstanceId: `fields/${fieldId}/${fieldInstanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        contentTypeId,
        fieldId,
        movement
      }
    }),
    rename: (contentTypeId, contentTypeInstanceId, fieldId, fieldInstanceId, callsite, value): Intents.FieldRename => new Intents.FieldRename({
      type: 'field/rename',
      meta: {
        contentTypeInstanceId: `contentType/${contentTypeId}/${contentTypeInstanceId}`,
        fieldInstanceId: `fields/${fieldId}/${fieldInstanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        contentTypeId,
        fieldId,
        props: {
          'newId': value
        }
      }
    }),
    delete: (contentTypeId, contentTypeInstanceId, fieldId, fieldInstanceId, callsite): Intents.FieldDelete => new Intents.FieldDelete({
      type: 'field/delete',
      meta: {
        contentTypeInstanceId: `contentType/${contentTypeId}/${contentTypeInstanceId}`,
        fieldInstanceId: `fields/${fieldId}/${fieldInstanceId}`,
        callsite: {
          file: callsite.getFileName(),
          line: callsite.getLineNumber()
        }
      },
      payload: {
        contentTypeId,
        fieldId
      }
    })
  }
}

export default actionCreators
