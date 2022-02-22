#!/usr/bin/env node

import { program } from 'commander'
import fs from 'fs'

program
  .name('teledrive-merger')
  .version('0.1.0')
  .description('Merges huge files')

program
  .requiredOption('-i, --input <files...>', 'Input all file parts')
  .requiredOption('-o, --output <file>', 'Output file')
  .action(async ({ input, output }) => {
    console.log('Start...')
    try {
      fs.writeFileSync(output, Buffer.from([]))
      input.reduce((_: Buffer, file: string, i: number) => {
        fs.appendFileSync(output, fs.readFileSync(file))
        console.log('Merging... ' + (i + 1) + '/' + input.length)
      }, Buffer.from([]))
      console.log('Done file saved in ' + output)
    } catch (error) {
      console.error(`Error: ${JSON.stringify(error)}`)
    }
  })

program.parse()