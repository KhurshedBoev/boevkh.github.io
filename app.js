// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * dnaBases.length)];
  };
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
    
  };

  function generateSequentialIds() {
    let currentId = 0;
    return function() {
        return currentId++;
      }
    }

function pAequorFactory(number, dnaBase) {
    return {
        specimenNum: number,
        dna: dnaBase,
        mutate() {
            const index = Math.floor(Math.random() * this.dna.length);
            let newBase = returnRandBase();
            while (newBase === this.dna[index]) {
                newBase = returnRandBase();
            }
            const base = this.dna[index];
            this.dna.splice(index, 1, newBase)

            return this.dna;
        },
        compareDNA(pAequor) {
            //console.log(pAequor)
            const matchingBase = [];
            for (let i=0; i< this.dna.length; i++) {
                if(pAequor.dna[i] === this.dna[i]) {
                    matchingBase.push(this.dna[i]);
                }
                
            };
            return Math.floor(matchingBase.length / this.dna.length * 100);
        },
        willLikelySurvive() {
            const dnaC = [];
            const dnaG = [];
            for (let i=0; i< this.dna.length; i++) {
                if(this.dna[i] === 'C') {
                    dnaC.push(this.dna[i]);
                } else if (this.dna[i] === 'G') {
                    dnaG.push(this.dna[i])
                }
            }
            
            if (dnaC.length / this.dna.length * 100 > 60 || dnaG.length / this.dna.length * 100 > 60) {
                return mergedBases = dnaC.concat(dnaG);
            } else {
                return false;
            }
        }
    }
}
  const newSpecimen = pAequorFactory(3, mockUpStrand())

  const mutateBase = newSpecimen.mutate();
  
  const pAequor = {specimenNum: 4, dna: mockUpStrand()};

  const compareResult = newSpecimen.compareDNA(pAequor)

  const survival = newSpecimen.willLikelySurvive()
  
  const getNextId = generateSequentialIds();

  let pAequorIdeal = [];

  while (pAequorIdeal.length < 30) {
    const dna = mockUpStrand();
    const newSpecimen = pAequorFactory(getNextId(), dna);
    if (newSpecimen.willLikelySurvive()) {
      pAequorIdeal.push(newSpecimen);
    }
  }
  
  console.log(pAequorIdeal)
  //console.log(getNextId())