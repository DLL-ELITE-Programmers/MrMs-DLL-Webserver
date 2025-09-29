export interface participant {
    department: string
    number: number
}

export interface candidate{
    male: participant[]
    female: participant[]
}

export type scores = Record<string, number|undefined>
