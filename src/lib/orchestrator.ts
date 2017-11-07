'use strict'
import * as _ from 'lodash'

import OfflineAPI from './offline-api/index'
import { migration } from './migration-steps/index'
import IntentList from './intent-list/index'

import { ContentType } from './entities/content-type'
import { Entry } from './entities/entry'
import { HttpRequest } from './interfaces/request'

export default async function (existingCts, existingEntries, migrationScript): Promise<HttpRequest[]> {
  const intents = await migration(migrationScript)
  const list = new IntentList(intents)
  const packages = list.toPackages()

  const existingCTs: Map<String, ContentType> = new Map()

  for (const ct of existingCts) {
    const contentType = new ContentType(ct)

    existingCTs.set(contentType.id, contentType)
  }

  const entries: Entry[] = existingEntries.map((apiEntry) => {
    return new Entry(apiEntry)
  })

  const state = new OfflineAPI(existingCTs, entries)

  for (const pkg of packages) {
    await pkg.applyTo(state)
  }

  const batches = await state.getRequestBatches()
  // for now, making this compatible to our tests where we expect a flat array of request objects
  return _.flatten(batches.map(b => b.requests))
}
