// Copy this into your browser's console
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function downloadImage(baseUrl, unit) {
    const url = `${baseUrl}/images/icons/units/${unit}.png`
    const link = document.createElement('a')

    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const blob = await response.blob()
        const blobUrl = window.URL.createObjectURL(blob)

        link.href = blobUrl
        link.download = `${unit}.png`

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        window.URL.revokeObjectURL(blobUrl)
        console.log(`✓ Downloaded: ${unit}.png`)
        return true
    } catch (error) {
        console.error(`✗ Failed to download ${unit}: ${error}`)
        return false
    }
}

async function downloadImagesInBatches(baseUrl, units, batchSize = 5, delayBetweenBatches = 2000) {
    const failed = []

    // Process in batches
    for (let i = 0; i < units.length; i += batchSize) {
        const batch = units.slice(i, i + batchSize)
        console.log(`Processing batch ${i / batchSize + 1} of ${Math.ceil(units.length / batchSize)}`)

        // Download batch
        const results = await Promise.all(batch.map((unit) => downloadImage(baseUrl, unit)))

        // Track any failures
        batch.forEach((unit, index) => {
            if (!results[index]) failed.push(unit)
        })

        // Wait before next batch
        if (i + batchSize < units.length) {
            console.log(`Waiting ${delayBetweenBatches / 1000} seconds before next batch...`)
            await sleep(delayBetweenBatches)
        }
    }

    // Final report
    console.log('\nDownload Complete!')
    console.log(`Successfully downloaded: ${units.length - failed.length} images`)
    if (failed.length > 0) {
        console.log(`Failed downloads: ${failed.length}`)
        console.log('Failed units:', failed)
    }

    return failed
}

// Unit list
const units = [
    'crab',
    'hunter',
    'recall',
    'recallhunter',
    'scorpion',
    'beetle',
    'blink',
    'blinkhunter',
    'gunbot',
    'missilebot',
    'wasp',
    'hornet',
    'knight',
    'crossbow',
    'ballista',
    'kingcrab',
    'crusader',
    'bomber',
    'shocker',
    'recallshocker',
    'mortar',
    'swiftshocker',
    'heavyhunter',
    'destroyer',
    'raider',
    'turret',
    'butterfly',
    'dragonfly',
    'falcon',
    'airship',
    'advancedrecall',
    'mammoth',
    'stinger',
    'flakturret',
    'heavyballista',
    'gargantua',
    'sniper',
    'advancedblink',
    'assaultbot',
    'advancedbot',
    'behemoth',
    'bulwark',
    'katbus',
    'locust',
    'kraken',
    'predator',
    'valkyrie',
    'advanceddestroyer',
    'artillery'
]

const baseUrl = 'https://cdn.playbattleaces.com'

// Start the download with 5 images per batch and 2 second delay between batches
downloadImagesInBatches(baseUrl, units).then((failed) => {
    if (failed.length > 0) {
        console.log('\nYou can retry failed downloads with:')
        console.log('downloadImagesInBatches(baseUrl, ' + JSON.stringify(failed) + ')')
    }
})
