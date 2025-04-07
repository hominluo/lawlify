import { OpenAI } from 'openai';

const files = {
  'contract1.md': `**1. Legal Issue:**  
Did the defendant breach a valid service agreement by failing to perform on time?  
**Answer:** Yes.

**2. Facts:**  
Plaintiff: *Daphne Nguyen*  
Defendant: *UrbanTech Solutions LLC*  
Daphne contracted UrbanTech to develop a mobile app by August 1. The project was only 50% complete by September 15. She terminated the contract and sued for breach.

**3. Relevant Law:**  
Under *Parker v. Twentieth Century-Fox Film Corp.*, a party failing to perform within time stipulated is in breach unless time was not of the essence. California Civil Code §3300 allows damages for breach of contract.

**4. Application:**  
The contract specified a firm delivery date. UrbanTech blamed resource shortages, but did not request extensions. Email records showed lack of responsiveness and missed milestones.

**5. Conclusion:**  
Daphne won.  
Damages: $45,000 for alternative vendor costs and delay losses.  
Order: Full compensation within 21 days.
`,
  'contract2.md': `**1. Legal Issue:**  
Was there a valid enforceable oral contract for the sale of goods?  
**Answer:** No.

**2. Facts:**  
Plaintiff: *Leo Granger*  
Defendant: *Michelle Yoon*  
Leo claimed Michelle agreed orally to sell him 500 units of vintage wine worth $20,000. Michelle later denied the agreement and sold the wine to another buyer.

**3. Relevant Law:**  
Under the Uniform Commercial Code §2-201 (Statute of Frauds), contracts for the sale of goods over $500 must be in writing to be enforceable.

**4. Application:**  
No written agreement, no email confirmation. Text messages were vague and did not specify price or terms. The court found no enforceable contract.

**5. Conclusion:**  
Leo lost.  
No damages awarded.  
Order: Case dismissed with costs to plaintiff.`,
  'contract3.md': `**1. Legal Issue:**  
Did the defendant violate a non-compete clause in a former employment contract?  
**Answer:** Yes.

**2. Facts:**  
Plaintiff: *Beacon Consulting Inc.*  
Defendant: *Marcus Blake*  
Marcus left Beacon and began working with a direct competitor within 2 months, in violation of a 6-month non-compete clause.

**3. Relevant Law:**  
While non-compete clauses are generally void in California (Business & Professions Code §16600), they may apply narrowly to trade secret protection.  
*Cytodyn, Inc. v. Amerimmune Pharmaceuticals, Inc.*

**4. Application:**  
The court found Marcus took proprietary client information to his new firm and breached confidentiality terms. The judge enforced the non-compete for 6 months.

**5. Conclusion:**  
Beacon won.  
Damages: $30,000 plus injunctive relief for 6 months.  
Order: Marcus barred from soliciting Beacon’s clients for the injunction period.`,
  'contract4.md': `**1. Legal Issue:**  
Can the plaintiff recover a deposit when the contract was canceled due to force majeure?  
**Answer:** No.

**2. Facts:**  
Plaintiff: *Samantha Lee*  
Defendant: *Emerald Events Ltd.*  
Samantha booked a wedding venue for May 2020. The event was canceled due to COVID-19 lockdowns. She sought refund of $15,000 deposit.

**3. Relevant Law:**  
Force majeure clauses excuse performance due to unforeseeable events.  
*Butler v. Nepple* (1956)—frustration of purpose doctrine.

**4. Application:**  
The contract had a force majeure clause allowing the vendor to retain deposits for canceled bookings. The pandemic was held to be a qualifying event.

**5. Conclusion:**  
Samantha lost.  
No refund.  
Each party to bear its own legal costs.`,
  'contract5.md': `**1. Legal Issue:**  
Did the plaintiff validly rescind a real estate purchase contract due to undisclosed defects?  
**Answer:** Yes.

**2. Facts:**  
Plaintiff: *Andrew Lin*  
Defendant: *Bella Rivera*  
Andrew purchased a residential property. Post-purchase inspection revealed termite damage and mold in the basement, not disclosed in the seller’s disclosures.

**3. Relevant Law:**  
California Civil Code §1102 mandates disclosure of known defects in real estate transactions.  
*Lingsch v. Savage* supports rescission for fraudulent nondisclosure.

**4. Application:**  
Expert reports confirmed the damage predated the sale. Emails suggested the seller was aware of the infestation but withheld disclosure.

**5. Conclusion:**  
Andrew won.  
Damages: Full rescission of the contract, plus $18,000 repair cost and closing fee reimbursement.  
Order: Title to revert to seller, buyer refunded within 30 days.`,
  'divorce1.md': `**1. Legal Issue:**  
How should the matrimonial home and business be divided in a no-fault divorce with no children?  
**Answer:** Equally, as per community property rules.

**2. Facts:**  
Petitioner: *Jessica Ho*  
Respondent: *Ryan Ho*  
Married for 11 years. No children. Own a 4-bedroom home in San Jose and a jointly run flower shop. Grounds: Irreconcilable differences.

**3. Relevant Law:**  
California is a community property state (Fam. Code §2550). All property acquired during marriage is split 50/50 unless otherwise agreed.

**4. Application:**  
Both contributed equally to the down payment and business. Home is valued at $1.2M with $600k equity. Business valued at $180k.

**5. Conclusion:**  
Equal split ordered.  
- Jessica awarded the flower shop; pays Ryan $90k equalization.  
- Ryan awarded the house; refinances and pays Jessica $300k equity.  
No spousal support awarded.`,
  'divorce2.md': `**1. Legal Issue:**  
Should the court consider domestic violence when awarding custody and property division?  
**Answer:** Yes.

**2. Facts:**  
Petitioner: *Marisol Vega*  
Respondent: *Antonio Vega*  
Married 9 years. 2 minor children. Marisol produced hospital records showing repeated domestic violence. Assets include a condo, 2 cars, and a 401(k).

**3. Relevant Law:**  
Fam. Code §3044 presumes custody should not go to abusers. Fam. Code §4320 allows courts to consider abuse in spousal support and asset division.

**4. Application:**  
Marisol was primary caregiver. Police and medical records confirmed abuse. Antonio failed to rebut presumption of unfitness for joint custody.

**5. Conclusion:**  
- Sole legal and physical custody to Marisol.  
- Antonio granted supervised visitation.  
- Marisol awarded 70% of the 401(k) and both vehicles.  
- Antonio ordered to pay $750/month in child support.`,
  'divorce3.md': `**1. Legal Issue:**  
Was the prenuptial agreement enforceable in limiting spousal support?  
**Answer:** Yes.

**2. Facts:**  
Petitioner: *Ethan Saunders*  
Respondent: *Chloe Saunders*  
Married 6 years. No children. Prenuptial agreement signed before marriage waived spousal support. Ethan seeks enforcement after Chloe demands support.

**3. Relevant Law:**  
Fam. Code §1615 allows enforcement unless the agreement was involuntary, unconscionable, or lacked disclosure.

**4. Application:**  
Chloe had legal counsel and full financial disclosures. Court found no coercion. She had stable income and was not left destitute.

**5. Conclusion:**  
Prenup upheld.  
No spousal support awarded.  
Assets divided equally: $80k in savings and a leased car.`,
  'divorce4.md': `**1. Legal Issue:**  
Should student loan debt incurred during the marriage be treated as community debt?  
**Answer:** No, it is the sole responsibility of the person who incurred it.

**2. Facts:**  
Petitioner: *Lucas Bennett*  
Respondent: *Nathan Bennett*  
Same-sex couple, married 5 years. Nathan took out $150,000 in student loans during the marriage for law school.

**3. Relevant Law:**  
Fam. Code §2641 states educational loans are the borrower’s separate debt unless parties agree otherwise.

**4. Application:**  
The court found no evidence of an agreement to share the debt. Lucas contributed household expenses but not to the loan directly.

**5. Conclusion:**  
- Nathan solely responsible for student loans.  
- Community assets ($50k savings, furniture, and a car) divided 50/50.  
No spousal support requested.`,
  'divorce5.md': `**1. Legal Issue:**  
Should an inherited vacation property be treated as community or separate property?  
**Answer:** It remains separate property.

**2. Facts:**  
Petitioner: *Angela Yu*  
Respondent: *Daniel Yu*  
Married 15 years. Daniel inherited a Lake Tahoe cabin during the marriage. Angela claims community interest due to shared renovations.

**3. Relevant Law:**  
Fam. Code §770: Inherited property is separate, but reimbursement may apply under *Marriage of Marsden* if community funds enhanced its value.

**4. Application:**  
Judge found Daniel inherited the property and maintained title in his name. But $40,000 in community funds were used for upgrades.

**5. Conclusion:**  
- Property remains Daniel’s.  
- Angela awarded $20,000 reimbursement (half of community contribution).  
- Remaining assets ($200k brokerage) split 50/50.  
No spousal support awarded.`,
  'employment1.md': `**1. Legal Issue:**  
Is the plaintiff entitled to compensation for an on-site machinery injury?  
**Answer:** Yes.

**2. Facts:**  
Plaintiff: *Carlos Jimenez*  
Defendant: *SkyWeld Fabrication Inc.*  
Carlos’s hand was crushed while using a hydraulic press that lacked a proper guard. He underwent two surgeries and lost partial function in two fingers.

**3. Relevant Law:**  
California Labor Code §3600 provides for no-fault worker’s compensation. *Fitzpatrick v. Fidelity & Casualty Co.* requires the injury to arise during the course of employment.

**4. Application:**  
The judge found Carlos was operating the press as instructed and the guard had been removed months earlier. No contributory negligence.

**5. Conclusion:**  
Carlos won.  
Damages: $185,000 (medical expenses: $40,000; permanent partial disability; vocational retraining).  
Order: Employer’s insurer to pay within 30 days.`,
  'employment2.md': `**1. Legal Issue:**  
Is the company liable when the injury occurs during lunch break in the break room?  
**Answer:** Yes.

**2. Facts:**  
Plaintiff: *Emily Tanaka*  
Defendant: *FreshCraft Bakers Ltd.*  
Emily slipped on spilled coffee in the company kitchen and fractured her tailbone.

**3. Relevant Law:**  
Under *Santa Rosa Junior College v. Workers' Comp. Appeals Board*, injuries on company premises during breaks can be compensable.

**4. Application:**  
Spill had been left unattended for over 2 hours. The area is maintained by the employer. Employer failed to follow their own policy for regular cleaning checks.

**5. Conclusion:**  
Emily won.  
Damages: $38,000 (medical costs: $9,000, temporary disability: $29,000).  
Order: Covered by employer’s worker’s compensation insurance.`,
  'employment3.md': `**1. Legal Issue:**  
Is the injury covered when it occurs during a commute using a company-provided vehicle?  
**Answer:** No.

**2. Facts:**  
Plaintiff: *Dev Patel*  
Defendant: *Golden Link Logistics Co.*  
Dev broke his clavicle in a car crash while driving to work in a company van.

**3. Relevant Law:**  
The “Going and Coming Rule” generally excludes commute injuries (*Hinojosa v. WCAB*), unless the employee was performing a special errand or duty.

**4. Application:**  
The judge found Dev was not required to use the van nor performing any task outside his usual commute. No exception applied.

**5. Conclusion:**  
Dev lost.  
No compensation.  
Each party to bear their own costs.`,
  'employment4.md': `**1. Legal Issue:**  
Was the injury due to repetitive strain compensable, and was it aggravated by employer negligence?  
**Answer:** Yes.

**2. Facts:**  
Plaintiff: *Ana Rodriguez*  
Defendant: *SiliconFin Bank*  
Ana developed carpal tunnel syndrome over 3 years due to repetitive typing and poor workstation ergonomics. Surgery required.

**3. Relevant Law:**  
California Code of Regulations Title 8, §9785 covers cumulative trauma. Case: *Granado v. WCAB*—employers must mitigate ergonomic hazards.

**4. Application:**  
Ergonomic assessments were never done. HR emails showed repeated complaints by Ana about wrist pain.  

**5. Conclusion:**  
Ana won.  
Damages: $72,000 (medical costs: $14,000; permanent partial disability: $20,000; future therapy + wages).  
Order: Paid in full by the company’s insurer.`,
  'employment5.md': `**1. Legal Issue:**  
Did the plaintiff fabricate an injury to claim compensation?  
**Answer:** Yes, the claim was dismissed as fraudulent.

**2. Facts:**  
Plaintiff: *Trevor Scott*  
Defendant: *NorTech IT Services*  
Trevor claimed he suffered a back injury after lifting a printer. Surveillance footage showed him lifting furniture at a moving job while on medical leave.

**3. Relevant Law:**  
Under California Insurance Code §1871.4, fraudulent worker’s compensation claims are criminal offenses.

**4. Application:**  
Video surveillance, inconsistency in medical reports, and absence of any incident report at work led the judge to dismiss the claim.

**5. Conclusion:**  
Trevor lost.  
No compensation awarded. Case referred to the district attorney for fraud investigation.`,
  'injury1.md': `**1. Legal Issue:**  
Whether the defendant was negligent in maintaining the stairwell, leading to the plaintiff’s injury.  
**Answer:** Yes, the defendant was negligent.

**2. Facts:**  
Plaintiff: *Julia Tran*  
Defendant: *Evergreen Property Management LLC*  
Julia slipped and fell down the common stairwell in her apartment building, resulting in a fractured ankle. The lights were out and the stairwell was wet.

**3. Relevant Law:**  
Under *Rowland v. Christian*, property owners owe a duty of care to maintain safe premises for invitees. California Civil Code §1714 affirms general negligence principles.

**4. Application:**  
The judge found Evergreen failed to repair broken lighting and neglected to clean accumulated rainwater. Surveillance showed no cleaning crew for over 48 hours during heavy rain.

**5. Conclusion:**  
Julia won.  
Damages: $68,000 (including $22,000 in medical bills, $10,000 pain and suffering, $36,000 for loss of income).  
Order: Defendant to pay full amount, plus legal costs.`,
  'injury2.md': `**1. Legal Issue:**  
Did the injury arise from the defendant’s negligence in product safety?  
**Answer:** No, the plaintiff assumed the risk.

**2. Facts:**  
Plaintiff: *Henry Lopez*  
Defendant: *IronForge Fitness Inc.*  
Henry injured his rotator cuff while using a shoulder press machine at a gym. He claimed the machine was defective.

**3. Relevant Law:**  
*Soule v. General Motors Corp.*—product liability requires proving the product was defective and unreasonably dangerous.  

**4. Application:**  
The judge found Henry misused the equipment by ignoring signage warning against excessive weight. Expert witnesses testified the machine was functioning properly.

**5. Conclusion:**  
Henry lost.  
No damages awarded. Each party to bear own costs.`,
  'injury3.md': `**1. Legal Issue:**  
Was the defendant negligent in a vehicular collision that led to a permanent disability?  
**Answer:** Yes, and liability was apportioned 80/20.

**2. Facts:**  
Plaintiff: *Tanisha Malik*  
Defendant: *Brian O’Reilly*  
Tanisha was struck in a crosswalk, resulting in spinal injuries and permanent mobility impairment.  

**3. Relevant Law:**  
California Vehicle Code §21950 mandates drivers yield to pedestrians in crosswalks. *Li v. Yellow Cab Co.* applies comparative negligence.

**4. Application:**  
Video evidence showed Tanisha had started crossing on green. However, she was texting while walking. Brian was speeding at 45 mph in a 25 mph zone.

**5. Conclusion:**  
Tanisha won, 80/20 apportionment.  
Damages: $300,000 total; Brian pays $240,000.  
Permanent disability compensation included.`,
  'injury4.md': `**1. Legal Issue:**  
Was there causation and liability in a workplace slip injury?  
**Answer:** Yes.

**2. Facts:**  
Plaintiff: *Oscar Bennett*  
Defendant: *Miller Plumbing Supplies*  
Oscar slipped on an oily surface in the warehouse while delivering parts. Fractured wrist and shoulder surgery required.

**3. Relevant Law:**  
Restatement (Second) of Torts §343 and California Civil Code §1714.

**4. Application:**  
Photographs and logs showed no signage and absence of cleanup logs. OSHA guidelines were violated.

**5. Conclusion:**  
Oscar won.  
Damages: $92,000 (including $15,000 in surgery, $30,000 in lost wages, $47,000 pain and suffering).  
Order: Payable within 45 days.`,
  'injury5.md': `**1. Legal Issue:**  
Whether the injury was caused by unforeseeable third-party conduct.  
**Answer:** No, the defendant was still liable.

**2. Facts:**  
Plaintiff: *Linda Park*  
Defendant: *Bayview Supermarket Inc.*  
A child pushed a grocery cart into Linda’s leg causing a fractured tibia.

**3. Relevant Law:**  
Premises liability—*Ortega v. Kmart Corp.*—store owners have a duty to prevent foreseeable injuries.

**4. Application:**  
Surveillance showed employees had noticed the child running around unsupervised with a cart 10 minutes earlier. The judge ruled the defendant had the opportunity to prevent the accident.

**5. Conclusion:**  
Linda won.  
Damages: $54,000 (including $18,000 for medical treatment and $36,000 general damages).  
Order: Full reimbursement and legal costs.`,
  'traffic1.md': `**1. Legal Issue:**  
Was the defendant liable for rear-ending the plaintiff on a clear day in traffic?  
**Answer:** Yes.

**2. Facts:**  
Plaintiff: *Brenda Martinez*  
Defendant: *Jared Lee*  
On May 12, 2023, at 3:45 PM, at the intersection of El Camino Real and Lawrence Expressway, Jared rear-ended Brenda's car while she was stopped at a red light. Weather was clear, and there were no road hazards.

**3. Relevant Law:**  
California Vehicle Code §21703 (Following too closely).  
*Shiver v. Laramee* holds that rear-end collisions create a presumption of negligence.

**4. Application:**  
Jared admitted he looked at his phone momentarily before impact. Vehicle damage: $8,400. Brenda had whiplash; $3,200 in medical bills.

**5. Conclusion:**  
Brenda won.  
Damages: $11,600 (car + medical).  
Order: Jared’s insurer to pay in full.`,
  'traffic2.md': `**1. Legal Issue:**  
Was the defendant negligent for speeding in rainy conditions, causing a collision?  
**Answer:** Yes.

**2. Facts:**  
Plaintiff: *Ramesh Kapoor*  
Defendant: *Shelly Woods*  
On November 20, 2022, at 7:20 AM near Exit 12 on I-880 in Hayward, Shelly hydroplaned into Ramesh’s car. She was going 75 mph in a 65 mph zone. Weather was rainy and the road slick.

**3. Relevant Law:**  
California Vehicle Code §22350 (Basic Speed Law): Drivers must reduce speed for weather.  
*Cabral v. Ralphs Grocery Co.* confirms breach of duty where driving too fast for conditions.

**4. Application:**  
Shelly’s dashcam showed speed, and weather records confirmed rain. Ramesh’s car was totaled, and he sustained a minor back injury.

**5. Conclusion:**  
Ramesh won.  
Damages: $26,000 (car value + $6,000 medical + pain & suffering).  
Order: Judgment entered against Shelly.`,
  'traffic3.md': `**1. Legal Issue:**  
Was the defendant liable for an accident caused while driving under the influence?  
**Answer:** Yes.

**2. Facts:**  
Plaintiff: *Kylie Sandoval*  
Defendant: *Tommy Nguyen*  
At 1:15 AM on July 4, 2023, on Main Street near 6th Avenue in Santa Rosa, Tommy ran a red light and t-boned Kylie’s car. He was later found to have a BAC of 0.11%.

**3. Relevant Law:**  
California Vehicle Code §23152 (DUI).  
*People v. McNeal*—DUI drivers are presumed negligent if involved in an accident.

**4. Application:**  
Police report confirmed DUI. Kylie suffered a fractured wrist and her vehicle was declared a total loss.

**5. Conclusion:**  
Kylie won.  
Damages: $42,000 (car + medical + lost wages).  
Order: Tommy’s insurer to pay; punitive damages reserved for separate civil claim.`,
  'traffic4.md': `**1. Legal Issue:**  
Did the plaintiff cause their own accident by speeding, despite claiming another vehicle cut them off?  
**Answer:** Yes. Claim denied.

**2. Facts:**  
Plaintiff: *Damien Royce*  
Defendant: *State of California (Caltrans)*  
Damien lost control at the off-ramp of CA-99 at 9:30 PM, October 10, 2022, hitting a signpost. He claimed poor signage and abrupt lane merges caused the crash. Road was dry. No other vehicle involved.

**3. Relevant Law:**  
Claims against public entities require proving a dangerous condition of public property (Gov. Code §835).

**4. Application:**  
Traffic cams showed Damien going 82 mph in a 55 mph zone. Signage was clear and legible. Expert traffic engineer testified road complied with design standards.

**5. Conclusion:**  
Damien lost.  
No damages.  
Order: Case dismissed with prejudice.`,
  'traffic5.md': `**1. Legal Issue:**  
Is a pedestrian entitled to compensation after being struck in a crosswalk by a vehicle turning right?  
**Answer:** Yes.

**2. Facts:**  
Plaintiff: *Angela Cortez*  
Defendant: *Samuel Dinh*  
On March 15, 2023, at 6:50 PM at the intersection of Castro and 18th Street in San Francisco, Samuel made a right turn and hit Angela, who was crossing with the walk signal. It was dusk, clear weather.

**3. Relevant Law:**  
California Vehicle Code §21950: Vehicles must yield to pedestrians in crosswalks.  
*Rector v. City of Los Angeles*—failing to yield is negligence per se.

**4. Application:**  
Eyewitnesses confirmed Angela was already halfway through the crosswalk. She suffered a sprained ankle and bruised hip. Samuel admitted not seeing her.

**5. Conclusion:**  
Angela won.  
Damages: $12,500 (medical bills + pain & suffering).  
Order: Samuel’s insurer to pay within 20 days.`,
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const processFile = async (file, query) => {
  const text = files[file];
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0,
    messages: [
      { role: 'user', content: `You are a legal analysis AI assistant. Your task is to evaluate the relevance of a given case to a user's legal situation and determine the case outcome. Follow these steps carefully:

1. First, review the user's legal situation:
<user_situation>
${query}
</user_situation>

2. Next, examine the details of the case that may or may not be relevant:
<case_details>
${text}
</case_details>

3. Carefully analyze both the user's situation and the case details. Look for similarities in the legal issues, circumstances, and applicable laws.

4. In your analysis, consider the following:
   - The core legal issues in both situations
   - Similarities and differences in the facts
   - Applicable laws or regulations
   - Jurisdiction and court level (if mentioned)
   - Time frame of the case versus the user's situation
   - If the case is not even a story, but talks about a relevant topic, it must not be considered relevant
   - If the case is in another top level category (e.g. traffic, employment, etc.), it must not be considered relevant

5. Based on your analysis, prepare a justification for the relevance of the case to the user's situation. This should be a detailed explanation of why the case is or isn't relevant, citing specific aspects from both the user's situation and the case details.

6. Assign a relevance score on a scale of 0 to 100, where 0 is completely irrelevant and 100 is highly relevant.

7. Determine whether the party in the same situation as the user (plaintiff or defendant) won the case.

8. If the case is relevant, provide direct quotes from the user's situation and the case details that are relevant to each other.

Remember, your analysis should be objective and based solely on the information provided in the user's situation and the case details. Do not make assumptions or introduce information not present in the given texts.` }
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'legal_analysis',
        strict: true,
        schema: {
          type: 'object',
          required: ['relevance_justification', 'relevance_quotes', 'relevance_score', 'case_outcome'],
          additionalProperties: false,
          properties: {
            relevance_justification: {
              type: 'string',
              description: 'Detailed justification for the relevance of the case'
            },
            relevance_quotes: {
              type: 'array',
              items: {
                type: 'object',
                required: ['user_situation_quote', 'case_details_quote'],
                additionalProperties: false,
                description: "Quotes from the user's situation and the case details that are relevant to each other. Must be direct quote verbatim from the text.",
                properties: {
                  user_situation_quote: {
                    type: 'string',
                    description: "Quote from the user's situation that is relevant to the case"
                  },
                  case_details_quote: {
                    type: 'string',
                    description: "Quote from the case details that is relevant to the user's situation"
                  }
                }
              }
            },
            relevance_score: {
              type: 'integer',
              description: 'Relevance score from 0 to 100'
            },
            case_outcome: {
              type: 'object',
              required: ['won', 'explanation'],
              additionalProperties: false,
              properties: {
                won: {
                  type: 'boolean',
                  description: 'Whether the party in the same situation as the user won the case'
                },
                explanation: {
                  type: 'string',
                  description: 'Brief explanation of the case outcome'
                }
              }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.choices[0].message.content);
};

const processFiles = async (query) => {
  const mdFiles = Object.keys(files);

  const promises = mdFiles.map((file) => {
    return new Promise(async (resolve) => {
      const results = await processFile(file, query);
      resolve({
        case_name: file.replace('.md', ''),
        ...results
      });
    });
  });
  return (await Promise.all(promises)).sort((a, b) => b.relevance_score - a.relevance_score);
};

export async function POST (req) {
  const { query } = await req.json()
  const results = await processFiles(query);
  console.log(JSON.stringify(results, null, 2));
  return Response.json(results)
}