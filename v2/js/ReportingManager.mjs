import { BugletGenome } from "./genetics/BugletGenome.mjs";

export class ReportingManager{

    constructor(bugletManager)
    {
        this.bugletManager = bugletManager;
    }

    buildPopulationReport()
    {
        let buglets = this.bugletManager.getBuglets();

        // create buglet genome to store totals
        var totalsGenome = new BugletGenome();
        totalsGenome.zeroOut();

        // get totals
        for(let i = 0; i < buglets.length; i++)
        {
            let buglet = buglets[i];

            for(const prop in buglet.genome)
            {
                totalsGenome[prop] += buglet.genome[prop];
            }
        }

        // get average
        for(const prop in totalsGenome)
        {
            totalsGenome[prop] /= buglets.length;
        }

        return totalsGenome.toString();
    }
}